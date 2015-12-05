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

exports.addUser = (u,cb) =>{

	pg.connect(conString, function(err, client, done) {
  		if (err) {
    		return console.error('error fetching client from pool', err);
  		}
  		client.query('select * from customer where name = $1',[u.name], function(err,result){
			{
				if(err){
					return console.error('ERROR RUNNING QUERY',err);
				}
			}
			

				if (result.rows[0] === undefined){
					client.query('INSERT INTO customer 	(userid,name,password,city,mailaddress,email,planid) values($1,$2,$3,$4,$5,$6,$7)',
   					[100,u.name,u.pass,u.city,u.mailAddress,u.email,u.planid],

   								function(err,result){
  													done();{
  														if(err){
  															return console.error('ERROR RUNNING QUERY',err);
  																}
  				
  															}

  																
  																cb(undefined);
  													});
   	}
			else{
   			
  			console.log("CONNECTED TO DB");
  			cb('ERROR USER EXISTS');
  				}
  });
  	
			});
		
}

exports.rent = (uid, mid, cb) =>{
  pg.connect(conString,function(err,client,done){

    if(err){
      return console.error('error fetching client from pool',err);
    }

    client.query('select * from rentals where Movieid = $1',[mid],function(err,result){
      if(err){
        return console.error('ERROR RUNNING QUERY',err);
      }
      if(result.rows[0] === undefined){
        client.query('INSERT INTO rentals (Userid,Movieid) values($1,$2)',[uid,mid],function(err,result){
          done();{
          if (err){
            return console.error('ERROR RUNNING QUERY',err);
          }
        }
          cb(undefined);
        });
      }
      else{
        cb('ERROR');
      }

    });

  });

}

exports.movieLookup = (mname,cb) =>{
  pg.connect(conString,function(err,client,done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
    client.query('select * from movies where moviename = $1',[mname],function(err,result){
      done();{
        if(err){
          return console.error('ERROR RUNNING QUERY',err);
        }
      }
      if(result.rows[0] === undefined) cb('MOVIE NOT IN DB');
      else cb(undefined);
    });
  });
}

exports.userLookup = (name,pass,cb) =>{
  pg.connect(conString,function(err,client,done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
    client.query('select * from customer where name = $1 and password = $2',[name,pass], function(err,result){
      done();{
        if(err){
          return console.error('ERROR RUNNING QUERY',err);
        }
      }
      if(result.rows[0] === undefined) cb('ERROR bad login')
      else cb(undefined);
    });
  });
}

exports.returnMovie = (uid,mid,cb) =>{
  pg.connect(conString,function(err,client,done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
    client.query('select * from rentals where movieid = $1 and userid = $2',[mid,uid],function(err,result){
      if(err){
        return console.error('ERROR RUNNING QUERY',err);
      }
      if(result.rows[0] !== undefined){
        client.query('delete from rentals where movieid = $1',[mid],function(err,result){
          done();{
            if(err){
              return console.error('ERROR RUNNING QUERY',err);
          }
        }
          cb(undefined);
        });
      }
      else cb('ERROR');
    });
  });
}

exports.rentalCount =(uid,cb) =>{
  pg.connect(conString,function(err,client,done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
    client.query('select count(*) from rentals where userid = $1',[uid],function(err,result){
      done();{
        if(err){
        return console.error('error fetching client from pool',err);
      }
    }
    });
  });
}
//client.query('INSERT INTO customer values(100,'+u.name +','+u.pass+','+ u.city+','+ u.mailAddress+','+u.email+','+u.plan,function(err,result){


