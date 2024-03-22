
-- querying the hotels list 

SELECT hotels.id, hotels.hotel_name, hotels.address, hotels.category, 
hotels.hotel_chain_id, hotel_chains.icon 
FROM hotels 
JOIN hotel_chains ON hotel_chains.id = hotels.hotel_chain_id;