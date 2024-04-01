import bodyParser from "body-parser";
import express, { query } from "express";
import pg from "pg";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { error } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ehotels",
  password: "8@9eqtd5n4cBTED!",
  port: 5433,
});
db.connect();

const port = 3000;

const hotel1 = {
  id: 10,
  name: "Sables de Saaba",
  location: "Ouagadougou, Burkina Faso",
  category: "luxe",
  icon: "😎",
  price: 200,
  chainIcon: "👑",
};

const hotel2 = {
  id: 1,
  name: "Poussières, l'hôtel",
  location: "Dédougou, Burkina Faso",
  category: "Éco",
  categoryIcon: "😙",
  price: 80,
  chainIcon: "🦉",
};

const data = [hotel1, hotel2];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, (req, res) => {
  console.log(`Listening on port : ${port}`);
});

// ---------------- ROUTES ---------------------

app.get("/", async (req, res) => {
  res.render("keto/index.ejs");
});

app.get("/hotel-rooms", async (req, res) => {
  let hotelSelectedIndex = parseInt(req.query.id);
  let hotelObjectSelected = hotelsListData[hotelSelectedIndex];

  currentHotelId = hotelSelectedIndex;
  currentHotelChainId = hotelObjectSelected.hotel_chain_id;
  currentHotelSelected = hotelObjectSelected;

  let recommendedRoomPrice = parseInt(hotelObjectSelected.price);
  let stayPrice = recommendedRoomPrice * numberOfNights;
  currentStayPrice = stayPrice;

  let hotelData = {
    hotel: hotelObjectSelected,
    stayPrice: stayPrice,
    stay: currentStay,
    numberOfNights: numberOfNights,
  };
  currentRoomsHotelPageData = hotelData;

  res.render("rooms-list.ejs", { data: currentRoomsHotelPageData });
});

app.get("/hotel-rooms-list", async (req, res) => {

  let rooms = getRoomsFromHotelAdminData(currentLoggedHotelAdminData);
  currentRoomsHotelPageData = rooms;

  res.render("hotel-rooms.ejs", {
    data: currentLoggedHotelAdminData,
    rooms:currentRoomsHotelPageData
  });

});

app.post("/create-reserv", async (req, res) => {
  let userFirstName = req.body.firstName;
  let userLastName = req.body.lastName;
  let userEmail = req.body.email;
  let userPwd = req.body.pwd;
  let userPhoneNumber = req.body.phoneNumber;
  let userStreetName = req.body.streetName;
  let userCity = req.body.city;
  let userCountry = req.body.country;
  let userZipCode = req.body.zipCode;

  let clientData = {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    pwd: userPwd,
    streetName: userStreetName,
    city: userCity,
    country: userCountry,
    zipCode: userZipCode,
  };

  console.log(`New Client Data: ${JSON.stringify(clientData, null, 2)}`);

  let newClientId = await createClient(clientData);
  currentClientId = newClientId;

  let reservRoomId = parseInt(currentRoomSelected.id);
  let reservArrivalDate = userArrivalDate;
  let reservDepartureDate = userDepartureDate;
  let reservPrice = currentStayPrice;
  let reservationData = {
    roomId: reservRoomId,
    arrivalDateInsert: reservArrivalDate,
    departureDateInsert: reservDepartureDate,
    clientId: currentClientId,
    stayPrice: reservPrice,
  };

  let newReservationId = await createReservation(reservationData);
  currentReservationId = newReservationId;

  res.redirect("/?successful");
});

app.get("/book", async (req, res) => {
  let roomSelectedIndex = parseInt(req.query.id);
  let roomSelected = currentHotelSelected.rooms[roomSelectedIndex];
  currentRoomSelected = roomSelected;
  currentRoomId = roomSelected.id;
  let stayPrice = parseInt(currentRoomSelected.price) * numberOfNights;
  currentStayPrice = stayPrice;
  currentPersonString = getPersonString(currentRoomSelected.capacity);

  let bookPageData = {
    hotelName: currentHotelSelected.name,
    roomName: currentRoomSelected.room_name,
    hotelLocation: currentHotelSelected.location,
    arrivalDateString: currentArrivalDateString,
    departureDateString: currentDepartureDateString,
    numberOfNights: numberOfNights,
    nightString: currentNightString,
    roomCapacity: currentRoomSelected.capacity,
    roomPersonString: currentPersonString,
    roomPrice: currentRoomSelected.price,
    stayPrice: stayPrice,
  };

  res.render("book-room.ejs", { data: bookPageData });
});

app.get("/login", async (req, res) => {
  res.render("user-login.ejs");
});

app.post("/user", async (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;

  let client = await verifyLoginEmail(email);
  let isPwdValid = await verifyPassword(pwd, client.pwd);
  if (client.length <= 0 || !isPwdValid) {
    console.log("Failed to log in, pwd dont match");
    res.redirect("/login?unsuccessful");
    return;
  }

  console.log("Client logged succesfully");
  client.pwd = "";
  let userReservations = await getUserReservations(client.id);
  
  if(userReservations.length > 0) {
    console.log(`user reservations: ${JSON.stringify(userReservations, null, 2)}`);
    let closestReservationString = getClosetReservationString(userReservations);
    currentLoggedClientData = client;
    currentLoggedClientData['reservations'] = userReservations;
    currentLoggedClientData['nextReservation'] = closestReservationString;
    
    console.log(`Client data: ${JSON.stringify(currentLoggedClientData, null, 2)}`);

    res.render("user-profile.ejs", { data: currentLoggedClientData, capitalizeFirstLetter:capitalizeFirstLetter });
    
    return;
  }

  currentLoggedClientData = client;
  currentLoggedClientData['reservations'] = userReservations;
  currentLoggedClientData['nextReservation'] = 'undefined';
  
  console.log(`Client data: ${JSON.stringify(currentLoggedClientData, null, 2)}`);
  
  res.render("user-profile.ejs", { data: currentLoggedClientData, capitalizeFirstLetter:capitalizeFirstLetter });
  return;

});

app.get('/employee', (req, res) => {
  res.render('employee-profile.ejs', 
  {
    data:currentLoggedEmployeeData,
    capitalizeFirstLetter:capitalizeFirstLetter
  });
}); 

app.post("/hotel-adm", async (req, res) => {
  
  let email = req.body.email;
  let pwd = req.body.pwd;
  let hotelAdmin = await verifyHotelAdminEmail(email);
  let hotelId = hotelAdmin.hotel_id;
  console.log(`hotel admin data: ${JSON.stringify(hotelAdmin, null, 2)}`);
  if(hotelAdmin.hasOwnProperty('id')) {

    let isPwdValid = await verifyPassword(pwd, hotelAdmin.pwd);
    
    if(isPwdValid) {
      let hotelData = await getHotelData(hotelId);
      console.log(`Hotel data: ${JSON.stringify(hotelData, null, 2)}`);
      let hotelChainId = parseInt(hotelData.hotel_chain_id)
      let hotelEmployees = await getHotelEmployees(hotelId);
      let roomReservations = await getHotelReservations(hotelData);
      let hotelChain = await getHotelChain(hotelChainId);
      currentLoggedHotelAdminData['pwd'] = '';
      currentLoggedHotelAdminData = hotelAdmin;
      currentLoggedHotelAdminData['hotel_chain'] = hotelChain;
      currentLoggedHotelAdminData['hotel'] = hotelData;
      currentLoggedHotelAdminData['employees'] = hotelEmployees;
      currentLoggedHotelAdminData['roomReservations'] = roomReservations;
      
      console.log(`hotel Admin successfully logged in! data: ${JSON.stringify(currentLoggedHotelAdminData, null, 2)}`);
      res.render('hotel-admin.ejs', 
      {
        data:currentLoggedHotelAdminData, 
        capitalizeFirstLetter:capitalizeFirstLetter,
        categoryToIcon:categoryToIcon
      });
      return;
    }
    console.log(`Password invalid`);
    res.redirect('/hotel-login?unsuccessful');
    return;
  }

  console.log(`Could not find employee`);
  res.redirect('/hotel-login?unsuccessful');
  return;
});

app.get('/hotel-adm', (req,res) => {
  res.render('hotel-admin.ejs', 
      {
        data:currentLoggedHotelAdminData, 
        capitalizeFirstLetter:capitalizeFirstLetter,
        categoryToIcon:categoryToIcon
      });
});
app.get('/hotel-employees', (req,res) => {
  res.render('hotel-employees.ejs', 
      {
        data:currentLoggedHotelAdminData, 
        capitalizeFirstLetter:capitalizeFirstLetter,
        categoryToIcon:categoryToIcon,
        getYearFromDate:getYearFromDate
      });
});
app.get('/hotel-view-employee', (req, res) => {
  
  let employeeSelectedIndex = parseInt(req.query.id);
  currentSelectedEmployeeIndex = employeeSelectedIndex;
  console.log(`employee index: ${employeeSelectedIndex}`);
  currentSelectedEmployeeData = currentLoggedHotelAdminData.employees[employeeSelectedIndex];
  currentSelectedEmployeeData['hotel_name'] = currentLoggedHotelAdminData.hotel.hotel_name;
  let addressObject = extractStreetNameCityCountry(currentSelectedEmployeeData.address);
  let streetName = addressObject.streetName;
  let city = addressObject.city;
  let country = addressObject.country;
  let zipCode = addressObject.zipCode;
  currentSelectedEmployeeData['street_name'] = streetName;
  currentSelectedEmployeeData['city'] = city;
  currentSelectedEmployeeData['country'] = country;
  currentSelectedEmployeeData['zipCode'] = zipCode;
  console.log(`selected Employee ${JSON.stringify(currentSelectedEmployeeData, null, 2)}`);
  res.render('hotel-view-employee.ejs', 
      {
        data:currentSelectedEmployeeData,
        capitalizeFirstLetter:capitalizeFirstLetter,
        categoryToIcon:categoryToIcon,
        formatNumberString:formatNumberString,
        getYearFromDate:getYearFromDate
      });
});

app.get('/hotel-edit-employee', (req,res) => {
  res.render(
    'modify-employee-profile.ejs',
    {
      employeeIndex:currentSelectedEmployeeIndex,
      data:currentSelectedEmployeeData,
      isHotelEditing:true,
      capitalizeFirstLetter:capitalizeFirstLetter
    }

  )
});

app.get('/hotel-edit-room', (req,res) => {
  let roomIndex = parseInt(req.query.id);
  currentSelectedRoomIndex = roomIndex;
  currentSelectedRoomData = currentRoomsHotelPageData[roomIndex];

  console.log(`Room index : ${roomIndex}`);
  console.log(`selected Room: ${JSON.stringify(currentSelectedRoomData, null, 2)}`);
  
  res.render(
    'hotel-modify-room.ejs',
    {
      selectedRoom:currentSelectedRoomData,
      data:currentLoggedHotelAdminData,
      capitalizeFirstLetter:capitalizeFirstLetter
    }

  )
});

app.get("/hotel-reservations", async (req, res) => {
  res.render("hotel-reservations.ejs", {
    data: currentLoggedHotelAdminData,
    capitalizeFirstLetter:capitalizeFirstLetter,
    getStayShort:getStayShort,
    categoryToIcon:categoryToIcon
  });
});

app.post('/hotel-update-reserv', async (req,res) => {
  let arrivalDate = req.body.arrivalDate;
  let departureDate = req.body.departureDate;
  let reservId = currentSelectedRoomReservation.reservation.id;
  let reservInfo = {
    arrival_date:arrivalDate,
    departure_date:departureDate,
    id:reservId
  };
  console.log(`Current selected: ${JSON.stringify(currentSelectedRoomReservation, null, 2)}`);
  console.log(`Hotel admin data: ${JSON.stringify(currentLoggedHotelAdminData, null, 2)}`);
  
  let didUpdateWork = updateReservationDates(reservInfo);
  if(didUpdateWork) {
    let arrivalDateDb = `${arrivalDate}T04:00:00.000Z`;
    let departureDateDb = `${departureDate}T04:00:00.000Z`;

    let roomIndex = currentLoggedHotelAdminData.roomIndex;
    let reservIndex = currentLoggedHotelAdminData.reservIndex;
    console.log(`Room Index: ${roomIndex}`);
    console.log(`Room Index: ${reservIndex}`);

    console.log(`Hotel admin roomReservations: ${JSON.stringify(currentLoggedHotelAdminData.roomReservations, null, 2)}`);

    currentLoggedHotelAdminData.roomReservations[roomIndex].reservations[reservIndex].arrival_date = arrivalDateDb;
    currentLoggedHotelAdminData.roomReservations[roomIndex].reservations[reservIndex].departure_date = departureDateDb;
    res.redirect('/hotel-reservations?successful');
    return;
  }
  res.redirect('/login');
  return;
});

app.get('/hotel-drop-reserv', async(req, res) => {
  let reservId = currentSelectedRoomReservation.reservation.id;
  let didDropWork = dropReservation(reservId);
  if(didDropWork) {
    let roomIndex = currentLoggedHotelAdminData.roomIndex;
    let reservIndex = currentLoggedHotelAdminData.reservIndex;
    currentLoggedHotelAdminData.roomReservations[roomIndex].reservations.splice(reservIndex, 1);
    currentSelectedRoomReservation = {};
    currentLoggedHotelAdminData.roomIndex = -1;
    currentLoggedHotelAdminData.reservIndex = -1;
    res.redirect('/hotel-reservations?successful');
    return;
  }

  console.log(`Drop reservation failed`);
  res.redirect('/login');
  return;
})

app.get("/hotel-reserv-details", async (req, res) => {

  let roomId = parseInt(req.query.roomId);
  let reservId = parseInt(req.query.reservId);
  console.log(`RoomId : ${roomId}, reservId : ${reservId}`);
  
  currentSelectedRoomReservation['room'] = currentLoggedHotelAdminData.roomReservations[roomId].room;
  currentSelectedRoomReservation['reservation'] = currentLoggedHotelAdminData.roomReservations[roomId].reservations[reservId];
  currentSelectedRoomReservation['client'] = currentLoggedHotelAdminData.roomReservations[roomId].reservations[reservId].client;
  currentSelectedRoomReservation['reservIndex'] = reservId;
  currentSelectedRoomReservation['roomIndex'] = roomId;

  currentLoggedHotelAdminData['reservIndex'] = reservId;
  currentLoggedHotelAdminData['roomIndex'] = roomId;
  
  let reservArrivalDate = currentSelectedRoomReservation.reservation.arrival_date;
  let reservDepartureDate = currentSelectedRoomReservation.reservation.departure_date;
  let reservRoomCapacity = currentSelectedRoomReservation.room.capacity;
  let reservRoomPrice = currentSelectedRoomReservation.room;

  let numberOfNights = calculateNightsBetweenDates(
    reservArrivalDate,
    reservDepartureDate
  );

  let arrivalDateFullDay = formatDateToReadable(reservArrivalDate);
  let departureDateFullDay = formatDateToReadable(reservDepartureDate);
  let nightString = capitalizeFirstLetter(getNightString(numberOfNights));
  let personString = capitalizeFirstLetter(getPersonString(reservRoomCapacity));

  

  currentSelectedRoomReservation['arrivalDateFull'] = arrivalDateFullDay;
  currentSelectedRoomReservation['departureDateFull'] = departureDateFullDay;
  currentSelectedRoomReservation['numberOfNights'] = numberOfNights;
  currentSelectedRoomReservation['nightString'] = nightString;
  currentSelectedRoomReservation['personString'] = personString;

  res.render(
    "hotel-reservation-details.ejs",
    {
      data:currentLoggedHotelAdminData,
      selectedReservation:currentSelectedRoomReservation,
      capitalizeFirstLetter:capitalizeFirstLetter,
      formatDateToYYYYMMDD:formatDateToYYYYMMDD
    }
    );
});


app.post('/employee', async(req, res) => {
  let email = req.body.email;
  let pwd = req.body.pwd;
  let employee = await verifyLoginEmployeeEmail(email);
  console.log(`employee data: ${JSON.stringify(employee, null, 2)}`);
  if(employee.hasOwnProperty('id')) {

    let isPwdValid = await verifyPassword(pwd, employee.pwd);
    
    if(isPwdValid) {
      let hotelData = await getHotelData(employee.hotel_id);
      currentLoggedEmployeeData = employee;
      currentLoggedEmployeeData['pwd'] = '';
      currentLoggedEmployeeData['hotel'] = hotelData;
      currentLoggedEmployeeData['employeeSince'] = getYearFromDate(employee.created_at);
      currentLoggedEmployeeData['nas'] = formatNumberString(employee.nas);
      console.log(`Employee successfully logged in! data: ${JSON.stringify(currentLoggedEmployeeData, null, 2)}`);
      res.render('employee-profile.ejs', 
      {
        data:currentLoggedEmployeeData, 
        capitalizeFirstLetter:capitalizeFirstLetter
      });
      return;
    }
    console.log(`Password invalid`);
    res.redirect('/employee-login?unsuccessful');
    return;
  }

  console.log(`Could not find employee`);
  res.redirect('/employee-login?unsuccessful');
  return;
  
});


app.post("/rooms", async (req, res) => {
  userArrivalDate = req.body.arrivalDate;
  userDepartureDate = req.body.departureDate;
  numberOfNights = countNumberOfDays(userArrivalDate, userDepartureDate);
  currentStay = formatRangeToShortString(userArrivalDate, userDepartureDate);
  currentArrivalDateString = formatDateToFullDay(userArrivalDate);
  currentDepartureDateString = formatDateToFullDay(userDepartureDate);
  currentNightString = getNightString(numberOfNights);

  let hotelsList = await getListHotels();
  hotelsList["stay"] = currentStay;

  hotelsListData = hotelsList;

  res.render("hotels-list.ejs", { data: hotelsListData });
});

app.get('/employee-login', (req, res) => {
  res.render('employee-login.ejs');
})

app.get("/pick-date", async (req, res) => {
  res.render("pick-reservation-date.ejs");
});

app.get("/about", async (req, res) => {
  res.render("keto/about.ejs");
});
app.get("/gallery", async (req, res) => {
  res.render("keto/gallery.ejs");
});
app.get("/room", async (req, res) => {
  res.render("keto/room.ejs");
});
app.get("/contact", async (req, res) => {
  res.render("keto/contact.ejs");
});


app.get("/hotel-add-employee", async (req, res) => {
  res.render("hotel-add-employees.ejs");
});
app.get("/hotel-modify-room", async (req, res) => {
  res.render("hotel-modify-room.ejs");
});
app.get("/hotel-add-room", async (req, res) => {
  res.render("hotel-add-room.ejs");
});


app.get("/modify-employee", async (req, res) => {
  res.render("modify-employee-profile.ejs");
});
app.get("/employee", async (req, res) => {
  res.render("employee-profile.ejs");
});
app.post('/update-user', async (req, res) => {
  let clientId = currentLoggedClientData['id'];
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let streetName = req.body.streetName;
    let city = req.body.city;
    let country = req.body.country;
    let zipCode = req.body.zipCode;

    let userData = {
      id:clientId,
      first_name: firstName,
      last_name:lastName,
      email: email,
      phone_number:phoneNumber,
      street_name:streetName,
      city: city,
      country:country,
      zipCode:zipCode
    };

    let didUpdateWork = updateUserInfo(userData);

    if(didUpdateWork) {
      currentLoggedClientData['first_name'] = firstName;
      currentLoggedClientData['last_name'] = lastName;
      currentLoggedClientData['address'] = `${streetName}, ${city}, ${country}, ${zipCode}`;
      currentLoggedClientData['email'] = email;
      currentLoggedClientData['phone_number'] = phoneNumber;
  
      res.redirect('/successful-modify-user-profile');
      return;
    } else {
      res.redirect('/login');
      return;
    }
    

});

app.post('/update-employee', async(req, res) => {
  
  let employeeId = currentLoggedEmployeeData['id'];
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  console.log(`Phone number body: ${phoneNumber}`);
  let streetName = req.body.streetName;
  let city = req.body.city;
  let country = req.body.country;
  let zipCode = req.body.zipCode;

  let employeeData = {
    id:employeeId,
    first_name: firstName,
    last_name:lastName,
    email: email,
    phone_number:phoneNumber,
    street_name:streetName,
    city: city,
    country:country,
    zipCode:zipCode
  };

  let didUpdateWork = await updateEmployeeInfo(employeeData);

  if(didUpdateWork) {
    
    currentLoggedEmployeeData['first_name'] = firstName;
    currentLoggedEmployeeData['last_name'] = lastName;
    currentLoggedEmployeeData['address'] = `${streetName}, ${city}, ${country}, ${zipCode}`;
    currentLoggedEmployeeData['email'] = email;
    currentLoggedEmployeeData['phone_number'] = phoneNumber;

    res.redirect('/successful-modify-employee-profile');
    return;
  } else {
    res.redirect('/login');
    return;
  }
});
app.post('/hotel-update-employee', async(req, res) => {
  
  let employeeId = currentSelectedEmployeeData['id'];
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let streetName = req.body.streetName;
  let city = req.body.city;
  let country = req.body.country;
  let zipCode = req.body.zipCode;

  let employeeData = {
    id:employeeId,
    first_name: firstName,
    last_name:lastName,
    email: email,
    phone_number:phoneNumber,
    street_name:streetName,
    city: city,
    country:country,
    zipCode:zipCode
  };

  let didUpdateWork = await updateEmployeeInfo(employeeData);

  if(didUpdateWork) {

    currentSelectedEmployeeData['first_name'] = firstName;
    currentSelectedEmployeeData['last_name'] = lastName;
    currentSelectedEmployeeData['address'] = `${streetName}, ${city}, ${country}, ${zipCode}`;
    currentSelectedEmployeeData['email'] = email;
    currentSelectedEmployeeData['phone_number'] = phoneNumber;

    currentLoggedHotelAdminData.employees[currentSelectedEmployeeIndex]['first_name'] = firstName;
    currentLoggedHotelAdminData.employees[currentSelectedEmployeeIndex]['last_name'] = lastName;
    currentLoggedHotelAdminData.employees[currentSelectedEmployeeIndex]['address'] = `${streetName}, ${city}, ${country}, ${zipCode}`;
    currentLoggedHotelAdminData.employees[currentSelectedEmployeeIndex]['email'] = email;
    currentLoggedHotelAdminData.employees[currentSelectedEmployeeIndex]['phone_number'] = phoneNumber;

    res.redirect('/hotel-employees');
    return;
  } else {
    res.redirect('/login');
    return;
  }
});

app.get('/successful-modify-employee-profile', (req,res) => {
  res.redirect('/employee?successful');
});

app.post('/update-user-reserv', async(req, res) => {
  
  let arrivalDate = req.body.arrivalDate;
  let departureDate = req.body.departureDate;
  let reservRoomId = currentReservationSelectedData['id'];
  let reservInfoToUpdate = {
    id:reservRoomId,
    arrival_date:arrivalDate,
    departure_date:departureDate,
  };
  let didUpdateWork = await updateReservationDates(reservInfoToUpdate);
  
  if(didUpdateWork) {
    // if successfull
    let arrivalDateDb = `${arrivalDate}T04:00:00.000Z`;
    let departureDateDb = `${departureDate}T04:00:00.000Z`;
    currentLoggedClientData.reservations[currentReservSelectedIndex]['arrival_date'] = arrivalDateDb;
    currentLoggedClientData.reservations[currentReservSelectedIndex]['departure_date'] = departureDateDb;
    
    res.redirect('/successful-modify-user-reservation');
    return;
  } 

  res.redirect('/login');
  return;
  
});

app.get('/successful-modify-user-reservation', (req, res) => {
  res.redirect('/reservations?successful');
});
app.get('/successful-modify-user-profile', (req, res) => {
  res.render('user-profile.ejs', {data:currentLoggedClientData, capitalizeFirstLetter:capitalizeFirstLetter});
});

async function updateReservationDates(reservInfo) {
  const query = `UPDATE reservations 
              SET arrival_date = $1, departure_date = $2 
              WHERE id = $3`;
  const paramValues = [reservInfo.arrival_date, reservInfo.departure_date, reservInfo.id];
  console.log(`ArrivalDate : ${reservInfo.arrival_date}, DepartureDate: ${reservInfo.departure_date}`);
  try {

    const result = await db.query(query, paramValues);
    if(result.rowCount > 0 ) {
      console.log(`Reservation successfully modified`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error while updating reservations data: ${error.stack}`);
    throw error;
    return false;
  }
}

async function updateUserInfo(userData) {
  const query = `UPDATE clients 
    SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5
    WHERE id = $6`;
    let fullAddress = `${userData.street_name}, ${userData.city}, ${userData.country}, ${userData.zipCode}`;
    const paramValues = [userData.first_name, userData.last_name, userData.email, userData.phone_number, fullAddress, userData.id];

    try {
      const result = await db.query(query, paramValues);
      if(result.rowCount <= 0 ) {
        // No rows Updated
        return false;
      }
      
      // row was updated 
      return true;
    } catch (error) {
      console.error(`Error while updating user profile : ${error.stack}`);
      return false;
    }
}

async function updateEmployeeInfo(employeeData) {
  const query = `UPDATE employees 
    SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5
    WHERE id = $6`;
    let fullAddress = `${employeeData.street_name}, ${employeeData.city}, ${employeeData.country}, ${employeeData.zipCode}`;
    const paramValues = [employeeData.first_name, employeeData.last_name, employeeData.email, employeeData.phone_number, fullAddress, employeeData.id];

    try {
      const result = await db.query(query, paramValues);
      if(result.rowCount <= 0 ) {
        // No rows Updated
        return false;
      }
      
      // row was updated 
      return true;
    } catch (error) {
      console.error(`Error while updating user profile : ${error.stack}`);
      return false;
    }
}



app.get('/edit-employee-info', (req, res) => {
  console.log(`Employee data: ${JSON.stringify(currentLoggedEmployeeData, null, 2)}`);
  let addressObject = extractStreetNameCityCountry(currentLoggedEmployeeData.address);
  let streetName = addressObject.streetName;
  let city = addressObject.city;
  let country = addressObject.country;
  let zipCode = addressObject.zipCode;

  currentLoggedEmployeeData['street_name'] = streetName;
  currentLoggedEmployeeData['city'] = city;
  currentLoggedEmployeeData['country'] = country;
  currentLoggedEmployeeData['zipCode'] = zipCode;
  res.render("modify-employee-profile.ejs", {
    data:currentLoggedEmployeeData,
    capitalizeFirstLetter:capitalizeFirstLetter
  });

});


app.get('/hotel-login', (req, res) => {
  res.render('hotel-adm-login.ejs');
});

app.get("/edit-info", async (req, res) => {

    console.log(`client data: ${JSON.stringify(currentLoggedClientData, null, 2)}`);
    let addressObject = extractStreetNameCityCountry(currentLoggedClientData.address);
    let streetName = addressObject.streetName;
    let city = addressObject.city;
    let country = addressObject.country;
    let zipCode = addressObject.zipCode;

    currentLoggedClientData['street_name'] = streetName;
    currentLoggedClientData['city'] = city;
    currentLoggedClientData['country'] = country;
    currentLoggedClientData['zipCode'] = zipCode;
  res.render("modify-profile.ejs", {data:currentLoggedClientData, capitalizeFirstLetter:capitalizeFirstLetter});
});

app.get('/delete-reserv', async(req, res) => {
  let reservToDeleteId = currentReservationSelectedData['id'];
  let didDropWork = await dropReservation(reservToDeleteId);
  if(didDropWork) {
    currentReservationSelectedData = [];
    currentLoggedClientData['reservations'].splice(currentReservSelectedIndex, 1);
    currentReservSelectedIndex = -1;
    res.redirect('/reservations?successful');
    return;
  }
  res.redirect('/reservations?unsuccessful');
  return;
});

app.get("/clerk-book", async (req, res) => {

  let hotelId = parseInt(req.query.id);
  let clerkHotelData = await getHotelData(hotelId);

  clerkCurrentHotelData = clerkHotelData;
  let employeeData = {
    first_name:currentLoggedEmployeeData['first_name'],
    last_name:currentLoggedEmployeeData['last_name']
  };
  clerkCurrentHotelData['employee'] = employeeData;

  console.log(
    `Clerk hotel data: ${JSON.stringify(clerkCurrentHotelData, null, 2)}`
  );

  res.render("clerk-book-room.ejs", { data: clerkCurrentHotelData });
});

app.post("/clerk-create-reserv", async (req, res) => {
  let newClientId = await createClient(clerkBookClientData);
  clerkBookReservationData["clientId"] = newClientId;

  console.log(`New client created: ${newClientId}`);

  let newReservationId = await createReservation(clerkBookReservationData);
  currentReservationId = newReservationId;

  console.log(`New reservation created: ${currentReservationId}`);

  res.redirect("employee/?successful");
});

app.post("/clerk-confirm", async (req, res) => {
  let userFirstName = req.body.firstName;
  let userLastName = req.body.lastName;
  let userEmail = req.body.email;
  let userPwd = req.body.pwd;
  let userPhoneNumber = req.body.phoneNumber;
  let userStreetName = req.body.streetName;
  let userCity = req.body.city;
  let userCountry = req.body.country;
  let userZipCode = req.body.zipCode;
  let userFullAddress = `${userStreetName}, ${userCity}, ${userCountry}, ${userZipCode}`;

  let clientData = {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    pwd: userPwd,
    streetName: userStreetName,
    city: userCity,
    zipCode: userZipCode,
    address: userFullAddress,
  };

  clerkBookClientData = clientData;

  let hotelName = clerkCurrentHotelData.hotel_name;
  let hotelLocation = clerkCurrentHotelData.address;
  let reservRoomSelectedId = parseInt(req.body.roomId);
  let reservRoomId = parseInt(
    clerkCurrentHotelData.rooms[reservRoomSelectedId].id
  );
  let reservRoomPrice = parseInt(
    clerkCurrentHotelData.rooms[reservRoomSelectedId].price
  );
  let reservRoomCapacity = parseInt(
    clerkCurrentHotelData.rooms[reservRoomSelectedId].capacity
  );
  let reservRoomName =
    clerkCurrentHotelData.rooms[reservRoomSelectedId].room_name;

  let reservArrivalDate = req.body.arrivalDate;
  let reservDepartureDate = req.body.departureDate;
  let numberOfNights = countNumberOfDaysWithDashes(
    reservArrivalDate,
    reservDepartureDate
  );

  let arrivalDateFullDay = formatDateWithDashToFullDay(reservArrivalDate);
  let departureDateFullDay = formatDateWithDashToFullDay(reservDepartureDate);
  let nightString = capitalizeFirstLetter(getNightString(numberOfNights));
  let personString = capitalizeFirstLetter(getPersonString(reservRoomCapacity));
  let stayPrice = reservRoomPrice * numberOfNights;

  let reservationData = {
    hotelName: hotelName,
    hotelLocation: hotelLocation,
    roomId: reservRoomId,
    reservArrivalDate: arrivalDateFullDay,
    reservDepartureDate: departureDateFullDay,
    arrivalDateInsert: convertDateForDbInsert(
      replaceDashesWithSlashes(reservArrivalDate)
    ),
    departureDateInsert: convertDateForDbInsert(
      replaceDashesWithSlashes(reservDepartureDate)
    ),
    numberOfNights: numberOfNights,
    roomPrice: reservRoomPrice,
    stayPrice: stayPrice,
    capacity: reservRoomCapacity,
    nightString: nightString,
    personString: personString,
  };

  let employeeData = {
    first_name:currentLoggedEmployeeData['first_name'],
    last_name:currentLoggedEmployeeData['last_name']
  };

  clerkBookReservationData = reservationData;
  clerkBookReservationData['roomName'] = reservRoomName;

  res.render("clerk-confirm-client.ejs", {
    clientData: clerkBookClientData,
    reservData: clerkBookReservationData,
    employeeData: employeeData
  });
});
app.get("/reserv-details", async (req, res) => {
  
  let reservSelectedId = parseInt(req.query.id);
  let reservSelected = currentLoggedClientData['reservations'][reservSelectedId];
  let numberOfNights = calculateNightsBetweenDates(reservSelected.arrival_date, reservSelected.departure_date);
  let nightString = getNightString(numberOfNights);
  reservSelected['numberOfNights'] = numberOfNights;
  reservSelected['nightString'] = nightString;
  let personString = getPersonString(parseInt(reservSelected.hotel.room.capacity));
  reservSelected['personString'] = personString;

  console.log(`Reserv Selected object: ${JSON.stringify(reservSelected, null, 2)}`);

  currentReservationSelectedData = reservSelected;
  currentReservSelectedIndex = reservSelectedId;

  res.render("reservation-details.ejs", {
    data:reservSelected, 
    capitalizeFirstLetter:capitalizeFirstLetter,
    formatDateToReadable:formatDateToReadable,
    formatDateToYYYYMMDD:formatDateToYYYYMMDD
  });

});
app.get("/reservations", async (req, res) => {

  console.log(`data: ${JSON.stringify(currentLoggedClientData, null, 2)}`);

  res.render("user-reservations.ejs", {data:currentLoggedClientData, getStayShort:getStayShort, categoryToIcon:categoryToIcon});
});
app.get("/hotels", async (req, res) => {
  let hotelsList = await getListHotels();

  res.render("hotels-list.ejs", { data: hotelsList });
});
app.get("/modify", async (req, res) => {
  res.render("modify-profile.ejs");
});
app.get("/user", async (req, res) => {
  res.render("user-profile.ejs", { data: currentLoggedClientData, capitalizeFirstLetter:capitalizeFirstLetter });
});

app.get("/room", async (req, res) => {
  res.render("rooms-list.ejs");
});

// ---------------- ROUTES ---------------------

app.get("/rooms", async (req, res) => {
  let hotelsList = await getListHotels();
  hotelsListData = hotelsList;

  res.render("hotels-list.ejs", { data: hotelsList });
});

// --------------- ** DATA ** --------------------

let hotelsListData = [];
let userArrivalDate = "";
let userDepartureDate = "";
let numberOfNights = 0;
let currentHotelChainId = 0;
let currentHotelId = 0;
let currentReservationId = 0;
let currentRoomId = 0;
let currentClientId = 0;
let currentStay = "";
let currentStayPrice = 0;
let currentPersonString = "";
let currentNightString = "";
let currentArrivalDateString = "";
let currentDepartureDateString = "";
let currentHotelSelected = {};
let recommendRoomSelected = {};
let currentRoomSelected = {};
let currentRoomsHotelPageData = {};
let testClientData = {
  firstName: "Ken",
  lastName: "Kouadio",
  streetName: "203 rue des boss",
  city: "Ouaga",
  country: "Burkina Faso",
  zipCode: "A9V 8Z8",
  email: "kenkoua@gmail.com",
  phoneNumber: "+22670078008",
  pwd: "1234567890",
};
let testReservationData = {
  roomId: 32,
  arrivalDateInsert: "08/03/2024",
  departureDateInsert: "10/03/2024",
  clientId: 3,
  stayPrice: 200,
};
// Clerk Booking Data
let clerkBookClientData = {};
let clerkBookReservationData = {};
let clerkConfirmDetails = {};
let clerkCurrentHotelData = {};
// Clerk Booking Data

// User Logged Data
let currentLoggedClientData = {};
let currentClientReservationsData = {};
  // reservations List Data 
  let currentReservationSelectedData = {};
  let currentReservSelectedIndex = 0;
// User Logged Data

// Employee Login Data 
let currentLoggedEmployeeData = {};
// Employee Login Data 

// Hotel Admin Login Data
let currentLoggedHotelAdminData = {};
let currentSelectedRoomReservation = {};
let currentSelectedEmployeeData = {};
let currentSelectedEmployeeIndex = -1;
let currentSelectedRoomIndex = -1;
let currentSelectedRoomData = {};



// --------------- ** DATA ** -----------------

// --------------- ** METHODS ** --------------------

async function getHotelRooms(hotelId) {
  try {
    const query = `select * from rooms
        where hotel_id = $1
        order by price DESC;`;

    const results = await db.query(query, [hotelId]);
    if (results.rows.length > 0) {
      let rooms = results.rows;
      return rooms;
    }
  } catch (error) {
    console.error("Error while querying hotels list", error.stack);
  }
}

async function dropReservation(reservationId) {
  const query = `DELETE FROM reservations WHERE id = $1`;
  const paramValues = [reservationId];

  try {
    const result = await db.query(query, paramValues);
    if(result.rowCount > 0) {
      console.log(`Successfully dropped reservation`);
      return true;
    } 
    console.log(`Failed to dropped reservation`);
    return false;
  } catch (error) {
    console.error(`Error while deleting row: ${error.stack}`);
  }

}

async function getHotelData(hotelId) {
  const hotelQuery = "SELECT * from hotels WHERE id = $1";
  const hotelParamValues = [hotelId];

  try {
    const hotelResult = await db.query(hotelQuery, hotelParamValues);
    const hotelRooms = await getHotelRooms(hotelId);
    if (hotelResult.rows.length > 0 && hotelRooms.length > 0) {
      let hotelData = hotelResult.rows[0];
      hotelData["rooms"] = hotelRooms;
      return hotelData;
    }
  } catch (error) {
    console.error("Error while querying hotel data: ", error.stack);
    throw error;
  }
}

async function getHotelChain(hotelChainId) {
  try {
    const query = `select * from hotel_chains
        where id = $1`;

    const results = await db.query(query, [hotelChainId]);
    if (results.rows.length > 0) {
      let hotelChain = results.rows[0];
      return hotelChain;
    }
  } catch (error) {
    console.error("Error while querying hotel chain", error.stack);
    return [];
  }
}

function getRoomsFromHotelAdminData(hotelAdminData) {
  let roomReservations = hotelAdminData.roomReservations;
  let rooms = [];
  roomReservations.forEach(function(roomReservation){
    let room = roomReservation.room;

    if(room.hasOwnProperty('id')) {
      rooms.push(room);
    }
  }); 
  return rooms;
}

async function getHotelEmployees(hotelId) {
  try {
    const query = `select 
              id, first_name, last_name, job_role, phone_number, email, created_at, 
              hotel_id, address, nas, is_admin
        from employees
        where hotel_id = $1`;

    const results = await db.query(query, [hotelId]);
    if (results.rows.length > 0) {
      let employees = results.rows;
      return employees;
    }
  } catch (error) {
    console.error("Error while querying hotels list", error.stack);
    return [];
  }
}

async function createClient(clientData) {
  let fullAddress = `${clientData.streetName}, ${clientData.city}, ${clientData.country}, ${clientData.zipCode}`;
  let hashPwd = await hashPassword(clientData.pwd);

  const query = `insert into clients (first_name, last_name, 
        address, email, phone_number, pwd)
    values(
        $1, $2, 
        $3, $4, $5, $6
    )
    RETURNING id;`;
  const paramValues = [
    clientData.firstName,
    clientData.lastName,
    fullAddress,
    clientData.email,
    clientData.phoneNumber,
    hashPwd,
  ];

  try {
    const result = await db.query(query, paramValues);
    const newClientId = result.rows[0].id;
    if (typeof newClientId === "number") {
      return parseInt(newClientId);
    } else {
      console.error("Error inserting new client:", error.message);
      throw error;
    }
  } catch (error) {
    console.error("Error inserting new client:", error.message);
  }
}

async function createReservation(reservationData) {
  let roomId = parseInt(reservationData.roomId);
  let arrivalDateInsert = convertDateForDbInsert(
    reservationData.arrivalDateInsert
  );
  let departureDateInsert = convertDateForDbInsert(
    reservationData.departureDateInsert
  );
  let clientId = parseInt(reservationData.clientId);
  let price = parseInt(reservationData.stayPrice);

  console.log(`arrival Date inside create meth: ${arrivalDateInsert}`);
  console.log(`departure Date inside create meth: ${departureDateInsert}`);

  const query = `INSERT INTO reservations (room_id, arrival_date, client_id, 
        departure_date, price)
        VALUES(
        $1, $2, $3,
        $4, $5
        )
        RETURNING id;`;
  const paramValues = [
    roomId,
    arrivalDateInsert,
    clientId,
    departureDateInsert,
    price,
  ];

  try {
    let result = await db.query(query, paramValues);
    if (typeof result.rows[0].id === "number") {
      return parseInt(result.rows[0].id);
    }
  } catch (error) {
    console.error(`Error while inserting new reservations : ${error.stack}`);
    throw error;
  }
}

function getPersonString(roomCapacity) {
  return roomCapacity == 1 ? "personne" : "personnes";
}
function getNightString(numberOfNights) {
  return numberOfNights == 1 ? "nuit" : "nuits";
}

async function getListHotels() {
  try {
    const query = `SELECT hotels.id, hotels.hotel_name, hotels.address, 
        hotels.category, hotels.hotel_chain_id, hotel_chains.icon
        FROM hotels 
        JOIN hotel_chains ON hotel_chains.id = hotels.hotel_chain_id;`;
    const results = await db.query(query);
    var hotels = [];
    if (results.rows.length > 0) {
      // Use map to transform rows into promises
      const hotelPromises = results.rows.map(async (result) => {
        let shortAddress = extractCityCountry(result.address);
        let categoryIcon = categoryToIcon(result.category);
        let hotelChainId = result.hotel_chain_id;
        let rooms = await getHotelRooms(parseInt(result.id));
        let recommendedRoomPrice = rooms[0].price;

        return {
          id: result.id,
          name: capitalizeFirstLetter(result.hotel_name),
          locationShort: shortAddress,
          rooms: rooms,
          location: result.address,
          category: capitalizeFirstLetter(result.category),
          categoryIcon: categoryIcon,
          price: recommendedRoomPrice,
          chainIcon: result.icon,
          hotelChainId: hotelChainId,
        };
      });

      // Wait for all promises to resolve
      return await Promise.all(hotelPromises);
    }
    return []; // Return an empty array if no results
  } catch (error) {
    console.error("Error while querying hotels list", error.stack);
  }
}

async function getUserReservations(clientId) {
  try {
    const query = `SELECT * from reservations 
                    WHERE reservations.client_id = $1`;
    const paramValues = [clientId];

    const results = await db.query(query, paramValues);
    var reservations = [];
    if (results.rows.length > 0) {
        for (let reservation of results.rows) {
            let roomId = reservation.room_id;
            let hotelData = await getHotelDataForUserReservationsList(roomId);
            reservation["hotel"] = hotelData;
      
            reservations.push(reservation);
        }
        return reservations;
}
    return []; // Return an empty array if no results
  } catch (error) {
    console.error("Error while querying hotels list", error.stack);
  }
}

async function getHotelReservations(hotelObject) {
  try {
    const rooms = hotelObject.rooms;
    let reservations = [];

    for (let room of rooms) {
      let roomId = room.id;
      let roomReservations = await getReservationsForRoom(roomId);
      let roomReservationsObject = {
        room:room,
        reservations:roomReservations
      };
      reservations.push(roomReservationsObject);
    }
  console.log(`Successfully queried reservations : ${reservations}`);
  return reservations;
  } catch(error) {
    console.error(`Error while getting hotel reservations: ${error.stack}`);
  }
}

async function getClientDataForReservation(clientId) {
  try {
    const query = `SELECT * from clients 
                    WHERE id = $1`;
    const paramValues = [clientId];

    const result = await db.query(query, paramValues);
    if (result.rows.length > 0) {
        let client = result.rows[0];
        client['pwd'] = '';
        return client;
    }
    return []; // Return an empty array if no results
  } catch (error) {
    console.error("Error while querying hotels list", error.stack);
  }
}

async function getReservationsForRoom(roomId) {
  try {
    const query = `SELECT * from reservations 
                    WHERE reservations.room_id = $1`;
    const paramValues = [roomId];

    const results = await db.query(query, paramValues);
    var reservations = [];
    if (results.rows.length > 0) {
        reservations = results.rows;
        for(let [index, reservation] of reservations.entries() ){
          let clientId = parseInt(reservation.client_id);
          let clientData = await getClientDataForReservation(clientId);
          reservations[index]['client'] = clientData;
        }
        return reservations;
    }
    return []; // Return an empty array if no results
  } catch (error) {
    console.error("Error while querying hotels list", error.stack);
  }
}

async function getHotelDataForUserReservationsList(roomId) {
  try {

    const RoomQuery = `SELECT * from rooms 
                    WHERE id = $1`;
    let paramValues = [roomId];
    const RoomResult = await db.query(RoomQuery, paramValues);
    if (RoomResult.rows.length > 0) {
        let room = RoomResult.rows[0];
        let hotelId = room.hotel_id;
        const hotelQuery = `SELECT * from hotels 
                        WHERE id = $1`;
        paramValues = [hotelId];

        const hotelResult = await db.query(hotelQuery, paramValues);
        if(hotelResult.rows.length > 0) {
            let hotelName = hotelResult.rows[0].hotel_name;
            let hotelAddress = hotelResult.rows[0].address;
            let hotelCategory = hotelResult.rows[0].category;
            let hotel = {
              hotel_name: hotelName,
              address: hotelAddress,
              category: hotelCategory,
              room: room
            };
            return hotel;
        }
      
    }
    return []; // Return an empty array if no results
  } catch (error) {
    console.error("Error while querying hotel data for user reservations", error.stack);
  }
}

function getClosestReservation(reservations) {
    const currentDate = new Date();
    let closestReservation = null;
    let smallestDifference = Infinity;
  
    reservations.forEach(reservation => {
      const arrivalDate = new Date(reservation.arrival_date);
      const difference = Math.abs(currentDate - arrivalDate);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestReservation = reservation;
      }
    });
  
    return closestReservation;
}

function formatDateToShort(date) {
    const options = { day: 'numeric', month: 'short' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

function getStayShort(arrivalDate, departureDate) {
  const stay = `${formatDateToShort(arrivalDate)} - ${formatDateToShort(departureDate)}`;
  return stay;
}

function getClosetReservationString(userReservations) {
    let closestReservation = getClosestReservation(userReservations);
    const stay = `${formatDateToShort(closestReservation.arrival_date)} - ${formatDateToShort(closestReservation.departure_date)}`;
    return stay;
}

async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword; // This line is crucial.
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // It's good practice to re-throw the error or handle it appropriately
  }
}

function replaceDashesWithSlashes(dateString) {
  return dateString.replace(/-/g, "/");
}

async function verifyLoginEmail(email) {
  const query = "select * from clients where email = $1";
  const paramValues = [email.toLowerCase()];

  try {
    let result = await db.query(query, paramValues);
    if (result.rows.length > 0) {
      console.log("Client exists");
      return result.rows[0];
    } else {
      console.log("Email is invalid");
      return [];
    }
  } catch (error) {
    console.error("Error while querying clients for login", error.stack);
    throw error;
    return [];
  }
}

async function verifyLoginEmployeeEmail(email) {
  const query = "select * from employees where email = $1";
  const paramValues = [email.toLowerCase()];

  try {
    let result = await db.query(query, paramValues);
    if (result.rows.length > 0) {
      console.log("employee exists");
      return result.rows[0];
    } else {
      console.log("Email is invalid");
      return {};
    }
  } catch (error) {
    console.error("Error while querying clients for login", error.stack);
    throw error;
    return {};
  }
}

async function verifyHotelAdminEmail(email) {
  const query = "select * from employees where email = $1 AND is_admin = 'YES'";
  const paramValues = [email.toLowerCase()];

  try {
    let result = await db.query(query, paramValues);
    if (result.rows.length > 0) {
      console.log("Admin exists");
      return result.rows[0];
    } else {
      console.log("Email is invalid");
      return {};
    }
  } catch (error) {
    console.error("Error while querying clients for login", error.stack);
    throw error;
    return {};
  }
}

async function verifyPassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    // if (match) {
    //     console.log('Passwords match');
    // } else {
    //     console.log('Passwords do not match');
    // }
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
  }
}

function convertDateForDbInsert(dateString) {
  const parts = dateString.split("/");
  // Assuming dateString is in DD/MM/YYYY format
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  // Convert to YYYY-MM-DD format
  const isoString = `${year}/${month}/${day}`;
  return isoString;
}

function categoryToIcon(category) {
  let icon = "";
  switch (category.toLowerCase()) {
    case "relaxation":
      icon = "🪭";
      break;
    case "éco":
      icon = "🪛";
      break;
    case "travail":
      icon = "💼";
      break;
    case "luxe":
      icon = "💸";
      break;
    case "royal":
      icon = "💎";
      break;
    case "vacances":
      icon = "🌴";
      break;
    case "palabres":
      icon = "😡";
      break;
    default:
      icon = "🏨";
      break;
  }

  return icon;
}

function extractCityCountry(hotelAddress) {
  const parts = hotelAddress.split(",");

  const city = parts[parts.length - 3].trim();
  const country = parts[parts.length - 2].trim();

  // Return the city and country concatenated together
  return `${city}, ${country}`;
}
function extractStreetNameCityCountry(address) {
    const parts = address.split(",");

    const streetName = parts[0].trim(); 
    const city = parts[1].trim(); 
    const country = parts[2].trim();
    const zipCode = parts[3].trim();
  
    // Return the street name, city, and country concatenated together
    let addressObject = {streetName:streetName, city:city, country:country, zipCode:zipCode};
    return addressObject;
  }

function countNumberOfDays(arrivalDate, departureDate) {
  // Parse the input strings to create Date objects
  const [arrivalDay, arrivalMonth, arrivalYear] = arrivalDate.split("/");
  const [departureDay, departureMonth, departureYear] =
    departureDate.split("/");

  // Note: Months are 0-indexed in JavaScript Date, so subtract 1
  const arrival = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
  const departure = new Date(departureYear, departureMonth - 1, departureDay);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = departure - arrival;

  // Convert milliseconds to days (1000 milliseconds in a second, 60 seconds in a minute,
  // 60 minutes in an hour, 24 hours in a day)
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return parseInt(differenceInDays);
}

function getYearFromDate(dateString) {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

function countNumberOfDaysWithDashes(arrivalDate, departureDate) {
  // Parse the input strings to create Date objects
  const [arrivalYear, arrivalMonth, arrivalDay] = arrivalDate.split("-");
  const [departureYear, departureMonth, departureDay] =
    departureDate.split("-");

  // Note: Months are 0-indexed in JavaScript Date, so subtract 1
  const arrival = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
  const departure = new Date(departureYear, departureMonth - 1, departureDay);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = departure - arrival;

  // Convert milliseconds to days (1000 milliseconds in a second, 60 seconds in a minute,
  // 60 minutes in an hour, 24 hours in a day)
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return parseInt(differenceInDays);
}

function formatDateToReadable(dateString) {
  // convert "2024-03-30T04:00:00.000Z" to Samedi 30 Mars
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const date = new Date(dateString);
  // Use 'fr-FR' locale to get French names for the day and month
  return date.toLocaleDateString('fr-FR', options);
}

function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // Get month and add 1 because getMonth() returns 0-11. Pad with '0' if less than 10.
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  // Get day and pad with '0' if less than 10.
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

function calculateNightsBetweenDates(arrivalDateString, departureDateString) {
  const arrivalDate = new Date(arrivalDateString);
  const departureDate = new Date(departureDateString);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = departureDate - arrivalDate;

  // Convert milliseconds to days
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays;
}

function formatRangeToShortString(arrivalDate, departureDate) {
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jui",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Parse the arrival date
  const [arrivalDay, arrivalMonth, arrivalYear] = arrivalDate.split("/");
  const arrival = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
  const formattedArrival = `${parseInt(arrivalDay)} ${
    monthNames[arrival.getMonth()]
  }`;

  // Parse the departure date
  const [departureDay, departureMonth, departureYear] =
    departureDate.split("/");
  const departure = new Date(departureYear, departureMonth - 1, departureDay);
  const formattedDeparture = `${parseInt(departureDay)} ${
    monthNames[departure.getMonth()]
  }`;

  return `${formattedArrival} - ${formattedDeparture}`;
}

function formatNumberString(numberString) {
  // Ensure the string is in the expected format
  if (numberString.length !== 9) {
    throw new Error('Number string must be 9 characters long.');
  }

  // Slice the string to get the first 3 digits
  const firstPart = numberString.slice(0, 3);
  // Mask the remaining parts
  const maskedPart = '***-***';

  // Concatenate the parts to get the desired format
  return `${firstPart}-${maskedPart}`;
}

function formatDateToFullDay(dateString) {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aôut",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  // Parse the departure date
  const [day, month, year] = dateString.split("/");
  const dayDate = new Date(year, month - 1, day);
  const formattedDate = `${dayNames[dayDate.getDay()]} ${parseInt(day)} ${
    monthNames[dayDate.getMonth()]
  }`;

  return formattedDate;
}
function formatDateWithDashToFullDay(dateString) {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aôut",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  // Parse the departure date
  const [year, month, day] = dateString.split("-");
  const dayDate = new Date(year, month - 1, day);
  const formattedDate = `${dayNames[dayDate.getDay()]} ${parseInt(day)} ${
    monthNames[dayDate.getMonth()]
  }`;

  return formattedDate;
}

function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// --------------- ** METHODS ** -----------------
