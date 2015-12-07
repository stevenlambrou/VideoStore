DROP TABLE Rentals;
DROP TABLE Movies;
DROP TABLE Customer;
DROP TABLE Plans;

CREATE TABLE Customer (UserID serial PRIMARY KEY, name varchar(20), password varchar(15), City varchar(50),  MailAddress varchar(100), Email varchar(50), PlanID integer);
CREATE TABLE Movies (MovieID serial PRIMARY KEY, MovieName varchar(100));
CREATE TABLE Rentals (name varchar(20), MovieID integer REFERENCES Movies(MovieID));
CREATE TABLE Plans (Plan serial PRIMARY KEY, PlanName varchar(50), Price integer, MaxNum integer);


INSERT INTO Movies(moviename) VALUES('TRON');
INSERT INTO Movies(moviename) VALUES('Pirates');
INSERT INTO Movies(moviename) VALUES('Steven');
INSERT INTO Movies(moviename) VALUES('Steven 2: Revengeance');
INSERT INTO Movies(moviename) VALUES('Gizmo');
INSERT INTO Movies(moviename) VALUES('Gizmo 2: Rise of Gizmo the Pre-sequel');

INSERT INTO Plans(planName,price,MaxNum) VALUES('Basic',19.99, 1);
INSERT INTO Plans(planName,price,MaxNum)VALUES('Advanced',29.99, 2);
INSERT INTO Plans(planName,price,MaxNum) VALUES('SuperAwesome',39.99, 3);
INSERT INTO Plans(planName,price,MaxNum) VALUES('GalaticPremium',49.99, 4);

INSERT INTO Customer(name,password,city,mailaddress,email,planid) VALUES('Matthaus', '12345', 'Boston', '123TestStreetAmherstMA', 'test@test.test', 1);
INSERT INTO Customer(name,password,city,mailaddress,email,planid)  VALUES('Ed', '695279', 'NewYork', '123TestStreetNewYorkCityNY', 'test3@test.test', 4);
INSERT INTO Customer(name,password,city,mailaddress,email,planid)  VALUES('Steven', '346784', '???', '123TestStreet??????', 'test4@test.test', 5);

INSERT INTO Rentals VALUES('Matthaus', 1);
INSERT INTO Rentals VALUES('Ed',3);
INSERT INTO Rentals VALUES('Steven',4);
INSERT INTO Rentals VALUES('Matthaus', 5);

