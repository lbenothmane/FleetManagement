#import rmongodb
library(rmongodb)

#connect to mongodb TODO setup for remote server
mongo <- mongo.create(host = "localhost")

queryIdle <- mongo.bson.from.JSON('{"speed": 0}')
queryAll <- mongo.bson.from.JSON()

#get the vehicle data table from the mongoDB TODO GET THIS WORKING
data <- mongo.get.database.collections(mongo, db = "VehicleData")

#TODO seperate by vehicleID and perform percentageIdle and timeIdle calculations and then input to the database for each vehicle


#count all numbers 
idleRows <- sum(data.speed==0)
totalRows <- sum(data)

percentageIdle <- idleRows / totalRows


timeIdle <- idleRows * 5

#print output for now
print(percentageIdle)
print(timeIdle)

observe({
   session$sendCustomMessage(type='percentIdleHandler', percentageIdle)
   session$sendCustomMessage(type='idleTimeHandler', percentageIdle)
})



mongo.disconnect(mongo)
mongo.destroy(mongo)
