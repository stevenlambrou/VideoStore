var pg = require('pg');
var conString = "postgres://postgres:nevets12@localhost/customer";

 exports.showUsers = () =>{
pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
   client.query('SELECT * From customer',function(err,result){
  	done();{
  		if(err){
  			return console.error('ERROR RUNNING QUERY',err);
  		}
  	}
  	console.log(result.rows[0]);
  });
  console.log("CONNECTED TO DB");
  });



}

exports.addUser = (u) =>{

	pg.connect(conString, function(err, client, done) {
  		if (err) {
    		return console.error('error fetching client from pool', err);
  		}
  		if(!checkUser(u,client)){
  			console.log("IF STATEMENT EXECUTED");
   		client.query('INSERT INTO customer 	(userid,name,password,city,mailaddress,email,planid) values($1,$2,$3,$4,$5,$6,$7)',
   			[100,u.name,u.pass,u.city,u.mailAddress,u.email,u.planid],

   								function(err,result){
  													done();{
  														if(err){
  															return console.error('ERROR RUNNING QUERY',err);
  																}
  				
  															}

  																console.log('ADDED USER');
  													});
   	}
   	else{	
   		console.log('USER NAME ALREADY EXISTS');
   		return false;
   	}
  console.log("CONNECTED TO DB");
  return true;
  });

	
}

//client.query('INSERT INTO customer values(100,'+u.name +','+u.pass+','+ u.city+','+ u.mailAddress+','+u.email+','+u.plan,function(err,result){

checkUser = (u,client) =>{
	
		var answer = client.query('select * from customer where name = $1',[u.name], function(err,result){
			{
				if(err){
					return console.error('ERROR RUNNING QUERY',err);
				}
			}
			console.log(result.rows[0]);
			return result;
		});
		
		console.log("CONNECTED TO DB");
		if(answer === undefined){
			return false;
		}
		return true;
		
	


}
