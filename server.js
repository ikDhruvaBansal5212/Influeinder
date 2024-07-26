
var express = require("express");
var fileuploader = require("express-fileupload");
const res = require("express/lib/response");
let app = express();
let mysql2 = require("mysql2");

app.use(fileuploader());

app.use(express.static("public"));
app.use(express.urlencoded("true"));




//88888888888888888888888888888888888888888888888
//let config = {
//    host: "127.0.0.1",
//    user: "root",
 //   password: "Guddu@2000",
  //  database: "project",
//    dateStrings: true
//}

//echo "# Influeinder" >> README.md//
//git init
//git add README.md
//git commit -m "first commit"
//git branch -M main
//git remote add origin https://github.com/ikDhruvaBansal5212/Influeinder.git
//git push -u origin main
// git add . 




let config = {
    host: "br9kouxwmtcioajrzr9d-mysql.services.clever-cloud.com",
    user: "unh6wypunc6g7ez9",
    password: "iU6GQReBpyDbfVi5tDpd",
    database: "br9kouxwmtcioajrzr9d",
    dateStrings: true,
    keepAliveInitialDelay : 10000,
    enableKeepAlive : true
}

// let config={
//     host:"127.0.0.1",
//     user:"root",
//     password:"Guddu@2000",
//     database:"project"
// }

var mysql = mysql2.createConnection(config);
mysql.connect(function (err) {
    if (err == null) {
        console.log("connected to database successfully");
    }
    else
        console.log(err.message);
})

app.listen(2004, function (req, resp) {
    console.log("Your server started 😊");
})

app.get("/", function (req, resp) {
    let path = __dirname + "/public/index.html";
    resp.sendFile(path);
})

app.get("/signup-process", function (req, resp) {
    console.log(req.query);

    let email = req.query.txtEmail;
    let pwd = req.query.pwd;
    let utype = req.query.combo;

    if (email == '' || pwd == '' || utype == '') {
        resp.send("  ___bhai form toh shi se bharle ,placement kaha se hogi__");
        return;
    }

    mysql.query("insert into users set email=?,pwd=?,utype=?", [email, pwd, utype], function (err) {
        if (err == null) {
            resp.send("SignedUp Successfullyy")
        }
        else
            resp.send(err.message);
    })
})

app.get("/login-process", function (req, resp) {
    let emaill = req.query.txtEmaill;
    let txtPwd = req.query.txtPwd;
    console.log(req.query);

    if (emaill == '' || txtPwd == '') {
        resp.send("kuch toh bhar de");
        return;
    }

    mysql.query("select * from users where email=? and pwd=?", [emaill, txtPwd], function (err, result) {
        console.log(result);
        if (err != null) {
            resp.send(err.message); return;
        }
        if (result.length == 0) {
            resp.send("Invalid Id or Password"); return; ''
        }
        if (result[0].ustatus == 1) {
            //  let path=__dirname+"/public/inf-dash.html";
            //  resp.sendFile(path);
            resp.send(result[0].utype);
            console.log(result[0].utype);


        }
        else {
            resp.send("U R Blocked!!!"); return;
        }

    })

})

//=========================================================================profile page

app.get("/profile-page", function (req, resp) {
    let path = __dirname + "/public/profile-page.html";
    resp.sendFile(path);
})

app.post("/profile-save-process", function (req, resp) {
    console.log(req.body);
    console.log(req.files);

    
    let path = __dirname + "/public/successful.html";
  

    let fileName = "";
    if (req.files != null) {
        fileName = req.files.picpath.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.picpath.mv(path);
    }
    else
        fileName = "nopic.jpg";

    let txtemail = req.body.txtemail;
    let uname = req.body.uname;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let address = req.body.address;
    let city = req.body.city;
    let contact = req.body.contact;
    let field = req.body.field;
    let instagram = req.body.instagram;
    let facebook = req.body.facebook;
    let youtube = req.body.youtube;
    //let picpath=req.body.picpath;



    mysql.query("insert into Iprofile values(?,?,?,?,?,?,?,?,?,?,?,?)", [txtemail, uname, gender, dob, address, city, contact, field, instagram, facebook, youtube, fileName], function (err) {
        if (err == null) {
             resp.sendFile(path)
        }
        else
            resp.send(err.message);
    })

})

app.get("/user-details", function (req, resp) {
    console.log(req.query);
    let email = req.query.txtemail;

    mysql.query("select * from Iprofile where emailid=?", [email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }

        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.post("/profile-update-process", function (req, resp) {
    console.log(req.body.prev);
    console.log(req.files);
    let path = __dirname + "/public/successful.html";

    let fileName = "";
    if (req.files != null) {
        fileName = req.files.picpath.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.picpath.mv(path);
    }
    else
        fileName ="nopic.jpg";

    let txtemail = req.body.txtemail;
    let uname = req.body.uname;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let address = req.body.address;
    let city = req.body.city;
    let contact = req.body.contact;
    let field = req.body.field;
    let instagram = req.body.instagram;
    let facebook = req.body.facebook;
    let youtube = req.body.youtube;
    //let picpath=req.body.picpath;



    mysql.query("UPDATE Iprofile SET uname = ?, gender = ?, dob = ?, address = ?, city = ?, contact = ?, field = ?, insta = ?, facebook = ?, youtube = ?, ppic = ? WHERE emailid = ?"
        , [uname, gender, dob, address, city, contact, field, instagram, facebook, youtube, fileName, txtemail], function (err) {
            if (err == null) {
                resp.sendFile(path)
            }
            else
                resp.send(err.message);
        })

})

//=================================================================
app.get("/post-booking-process", function (req, resp) {
    console.log(req.query);

    let txtemail = req.query.txtemail;
    let events = req.query.events;
    let date = req.query.date;
    let tos = req.query.tos;
    let city = req.query.city;
    let venue = req.query.venue;



    mysql.query("insert into eventbook values(?,?,?,?,?,?)", [txtemail, events, date, tos, city, venue], function (err) {
        if (err == null) {
            resp.send("Event posted Successfullyy")
        }
        else
            resp.send(err.message);
    })

})

app.get("/update-pwd-process", function (req, resp) {
    console.log(req.query);

    let email = req.query.email;
    let oldpwd = req.query.oldpwd;
    let newpwd = req.query.newpwd;
    let reppwd = req.query.reppwd;


    mysql.query("update users set pwd=? where email=?", [newpwd, email], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })
})

app.get("/validate-old-password", function (req, resp) {
    console.log(req.query);

    let email = req.query.email;
    let oldpwd = req.query.oldpwd;

    mysql.query("select pwd  from users where email=?", [email], function (err, result) {
        console.log(result);
        if (err == null)//no error
        {
            if (result == oldpwd) {
                console.log("yes password valid");
                return;
            }
            else {
                console.log("Invalid Email ID/password");

            }

        }
        else
            resp.send(err.message);
    })
})

app.get("/user-manager-page", function (req, resp) {
    let path = __dirname + "/public/user-manager.html";
    resp.sendFile(path);
})

app.get("/inf-console-page", function (req, resp) {
    let path = __dirname + "/public/inf-console.html";
    resp.sendFile(path);
})

app.get("/fetch-all-emails", function (req, resp) {

    mysql.query("select distinct email  from users ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-all-utype", function (req, resp) {

    mysql.query("select distinct utype  from users ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-all", function (req, resp) {

    mysql.query("select * from users ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-some", function (req, resp) {

    mysql.query("select * from users where email=?", [req.query.email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-utype", function (req, resp) {

    mysql.query("select * from users where utype=?", [req.query.utype], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/delete-one", function (req, resp) {

    mysql.query("delete from users where email=?", [req.query.email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send("done");//sending array of json object 0-1
    })
})

app.get("/block-one", function (req, resp) {

    mysql.query("update users set ustatus='0' where email=?", [req.query.email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send("done");
    })
})

app.get("/resume-one", function (req, resp) {

    mysql.query("update users set ustatus='1' where email=?", [req.query.email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send("done");
    })
})

//====================================================================inf.console 

app.get("/fetch-all-influ", function (req, resp) {

    mysql.query("select * from Iprofile ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-all-uname", function (req, resp) {

    mysql.query("select distinct uname from Iprofile ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-all-city", function (req, resp) {

    mysql.query("select distinct city from Iprofile ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-all-gender", function (req, resp) {

    mysql.query("select distinct gender from Iprofile ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

//============================================================================

app.get("/fetch-selname", function (req, resp) {


    mysql.query("select * from Iprofile where uname=?", [req.query.uname], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
        console.log(resultJsonAry);
    })
})

app.get("/fetch-selcity", function (req, resp) {


    mysql.query("select * from Iprofile where city=?", [req.query.city], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
        console.log(resultJsonAry);
    })
})

app.get("/fetch-all-city", function (req, resp) {

    mysql.query("select distinct city from Iprofile ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/fetch-selgender", function (req, resp) {


    mysql.query("select * from Iprofile where gender=?", [req.query.gender], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
        console.log(resultJsonAry);
    })
})

//============================================================================================influ-finder

app.get("/influ-finder-page", function (req, resp) {
    let path = __dirname + "/public/influ-finder.html";
    resp.sendFile(path);
})

app.get("/fetch-all-field", function (req, resp) {

    mysql.query("select distinct field from Iprofile ", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
    })
})

app.get("/fetch-all-city2", function (req, resp) {

    console.log(req.query.field);
    mysql.query("select distinct city from Iprofile", function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);

    })
})

app.get("/fetch-selfield", function (req, resp) {


    mysql.query("select * from Iprofile where field=?", [req.query.field], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);

    })
})

app.get("/dofind", function (req, resp) {
    console.log(req.query.field);
    console.log(req.query.city);


    mysql.query("select * from Iprofile where field=? and city=?", [req.query.field, req.query.city], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);

    })
})

app.get("/findbyname", function (req, resp) {
    console.log(req.query.name);



    mysql.query("select * from Iprofile where uname like ?", ["%" + req.query.name + "%"], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);

    })
})

app.get("/influcard", function (req, resp) {
    console.log(req.query.email);

    mysql.query("select * from Iprofile where emailid=?", [req.query.email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
    })

})

//==================================================================event manager

app.get("/event-manager-page", function (req, resp) {
    let path = __dirname + "/public/event-manager.html";
    resp.sendFile(path);
})

app.get("/eventbyemail", function (req, resp) {
    console.log(req.query.email);



    mysql.query("select * from eventbook where emailid like ? && doe>=current_date()", ["%" + req.query.email + "%"], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
        console.log(resultJsonAry);

    })
})

app.get("/eventbyemaildone", function (req, resp) {
    console.log(req.query.email);



    mysql.query("select * from eventbook where emailid like ? && doe<=current_date()", ["%" + req.query.email + "%"], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
        console.log(resultJsonAry);

    })
})







app.get("/deleteevent", function (req, resp) {
    console.log(req.query.email);



    mysql.query("delete from eventbook where emailid=?", [req.query.email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
        console.log(resultJsonAry);

    })
})

//==================================================================================client profile
app.get("/client-profile-page", function (req, resp) {
    let path = __dirname + "/public/client-profile-page.html";
    resp.sendFile(path);
})

app.post("/Cprofile-save-process", function (req, resp) {
    console.log(req.body);
    console.log(req.files);

    let path = __dirname + "/public/successful.html";
    

    let fileName = "";
    if (req.files != null) {
        fileName = req.files.picpath.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.picpath.mv(path);
    }
    else
        fileName = jsonAry[0].picpath;

    // let txtemail=req.body.txtemail;
    let txtname = req.body.txtname;
    let txtcity = req.body.txtcity;
    let txtstate = req.body.txtstate;
    let category = req.body.category;
    let contact = req.body.contact;





    mysql.query("insert into Cprofile values(?,?,?,?,?,?,?)", [req.body.txtemail, txtname, txtcity, txtstate, category, contact, fileName], function (err) {
        if (err == null) {
            resp.sendFile(path)
        }
        else
            resp.send(err.message);
    })

})

app.post("/Cprofile-update-process", function (req, resp) {
    console.log(req.body);
    console.log(req.files);

    let path = __dirname + "/public/successful.html";

   
   
    let fileName = "";
    if (req.files != null) {
        fileName = req.files.picpath.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.picpath.mv(path);
    }
    else
        fileName = "nopic.jpg";

    // let txtemail=req.body.txtemail;
    let txtname = req.body.txtname;
    let txtcity = req.body.txtcity;
    let txtstate = req.body.txtstate;
    let category = req.body.category;
    let contact = req.body.contact;





    mysql.query(" UPDATE Cprofile SET uname = ?, city = ?, state = ?, org = ?, mobile = ?, picpath = ? WHERE emailid = ?"
        , [ txtname, txtcity, txtstate, category, contact, fileName,req.body.txtemail], function (err) {
            if (err == null) {
                resp.sendFile(path)
            }
            else
                resp.send(err.message);
        })

})

app.get("/Cprofile-details", function (req, resp) {
    console.log(req.query);
    let email = req.query.txtemail;

    mysql.query("select * from Cprofile where emailid=?", [email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        console.log(resultJsonAry);
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

//=======================================================================================Reach us

app.get("/reach-us-page", function (req, resp) {
    let path = __dirname + "/public/reachus.html";
    resp.sendFile(path);
})

app.get("/contactus-process", function (req, resp) {
    console.log(req.query);

    let name = req.query.name;
    let Subject = req.query.Subject;
    let Email = req.query.Email;
    let description = req.query.description;

    

    mysql.query("insert into contactus set uname=?,subject=?,emailid=?,text=? ", [name, Subject, Email,description], function (err) {
        if (err == null) {
            resp.send("Complaint registered successfully");
        }
        else
            resp.send(err.message);
    })
})

//==============================================
app.get("/our-team-page", function (req, resp) {
    let path = __dirname + "/public/ourteam.html";
    resp.sendFile(path);
})

app.get("/our-services-page", function (req, resp) {
    let path = __dirname + "/public/ourservices.html";
    resp.sendFile(path);
})






