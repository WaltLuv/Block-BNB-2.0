// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Blockbnb {

    address public owner;
    uint256 public counter;
    uint256[] public rentalIds;

    constructor() {
        counter = 0;
        owner = msg.sender;
     }

    struct PropertyInfo {
        address owner;
        address guest;
        string name;
        string propertyAddress;
        string description;
        string imgUrl;
        uint256 bookingStartsAt;
        uint256 bookingEndsAt;
        uint256 pricePerDay;
        uint256 id;
        bool isBooked;
    }

    event PropertyListedEvent (
        string name,
        string propertyAddress, 
        string description,
        string imgUrl,
        uint256 pricePerDay,
        uint256 id
    );

    event PropertyBookedEvent (
        uint256 id,
        address guest, 
        uint256 numberOfDays,
        uint256 price   
    );

    mapping(uint256 => PropertyInfo) public properties;
   

    function listProperty(
        string memory name,
        string memory propertyAddress,
        string memory description,
        string memory imgUrl,
        uint256 pricePerDay
    ) public {
        PropertyInfo storage newProperty = properties[counter];

        newProperty.name = name;
        newProperty.propertyAddress = propertyAddress;
        newProperty.description = description;
        newProperty.imgUrl = imgUrl;
        newProperty.pricePerDay = pricePerDay;
        newProperty.id = counter;
        newProperty.isBooked = false;
        newProperty.bookingStartsAt = 0;
        newProperty.bookingEndsAt = 0;
        newProperty.owner = msg.sender;
        newProperty.guest = address(0);

        rentalIds.push(counter);

        emit PropertyListedEvent (
            name, 
            propertyAddress, 
            description, 
            imgUrl, 
            pricePerDay,
            counter 
        );
         counter++;   
    }

        function getDuePrice(
            uint id,
            uint256 startDate,
            uint256 endDate
         ) public view returns (uint256){
            PropertyInfo storage property = properties[id];
            uint256 numberOfDays = (endDate - startDate) / 86400000;
            return numberOfDays * property.pricePerDay;
        }

        function bookProperty(
            uint256 propertyId, 
            uint256 startDate,
            uint256 endDate 
        ) public payable {
            uint256 numberOfDays = (endDate - startDate) / 86400000;
        
        require(
            msg.value >= numberOfDays * properties[propertyId].pricePerDay, 
            "Send more MATIC"
        );
        payable(properties[propertyId].owner).transfer(msg.value);

        properties[propertyId].isBooked = true;
        properties[propertyId].bookingStartsAt = startDate;
        properties[propertyId].bookingEndsAt = endDate;
        properties[propertyId].guest = msg.sender;
        
        emit PropertyBookedEvent( 
            propertyId, 
            msg.sender, 
            numberOfDays,  
            msg.value
        );
    }
   
}
