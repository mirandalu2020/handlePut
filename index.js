const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "age": String,
  "height": String
});

const peopleModel = dynamoose.model('People', schema);

exports.handler = async(event) => {

  console.log('Event Parameter', event);

  let id =  event?.pathParameters?.id;

  let parsedBody = JSON.parse(event.body);

  let updatedName = parsedBody.name;

  const response = {statusCode: null, body: null};

  try {
    let personToUpdate = await PersonModel.scan('id').eq(params['id']).exec();
    console.log(personToUpdate);
    
    let results = await peopleModel.update({"id": id}, {"name": updatedName});
    console.log(results);
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch(e){
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }
  
  return response;
}