const Pool = require('pg').Pool
const pool = new Pool({
  user: 'iovzmyldbosysn',
  host: 'ec2-35-168-194-15.compute-1.amazonaws.com',
  database: 'd2etcrdolrb0eo',
  password: 'f27de6a9b637010959ef3abfbae8f8edc6d38ee7ac220d1073c1c47652420862',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    require: true
  }
})

const getUsers = (request, response) => {

  
    pool.query('SELECT* FROM public.users', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getMedicationByID = (request, response) => {
  let id = request.params.id
    id = id.replace(':', '');
    
    pool.query('select medication_name , frequency , med_start_date, med_end_date from public.medication where patient_id in (select patient_id from public.users where mailaddress = $1);', [id],  (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const getUserById = (request, response) => {
    let id = request.params.id
    id = id.replace(':', '');
     
    pool.query('SELECT * FROM public.users WHERE mailaddress = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getdiagnosisByID = (request, response) => {
    let id = request.params.id
      id = id.replace(':', '');
      
      pool.query('select * from public.diagnosis where patient_id in (select patient_id from public.users where mailaddress = $1);', [id],  (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    const getlabByID = (request, response) => {
      let id = request.params.id
        id = id.replace(':', '');
       
        pool.query('select * from public.lab where patient_id in (select patient_id from public.users where mailaddress = $1);', [id],  (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
  


  const createmeddata = (request, response) => {
  
    
    const var1 = request.body;
    
   console.log(var1)

    let patient_id=var1["patient_id"];
    let med_id=var1["med_id"]; 
    let MedicineName=var1["MedicineName"];
  
    let frequency=var1["frequency"];
    let startdate=var1["startdate"];
    let enddate=var1["enddate"];

   
    pool.query('INSERT INTO public.medication (patient_id, medication_id, medication_name , frequency , med_start_date, med_end_date,created_at, updated_at) VALUES ($1, $2, $3 , $4 , $5 , $6  , current_timestamp,current_timestamp)', [patient_id ,med_id , MedicineName, frequency,startdate ,enddate], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));

    })

  }

  const creatediagdata = (request, response) => {
    
    const var1 = request.body;
    
   console.log(var1)

   
    let patient_id=var1["patient_id"];
    let diag_id=var1["diagid"]; 
    let description=var1["Diagnosis"];
  
    let Datedetected=var1["Datedetected"];
    let Datecured=var1["Datecured"];
    let doctor=var1["Doctor"];
// response.send(JSON.stringify({enddate}));
  

    pool.query('INSERT INTO public.diagnosis (diagnosis_id, patient_id, description , doctor , date_detected, date_of_recovery,created_at, updated_at) VALUES ($1, $2, $3 , $4 , $5 , $6  , current_timestamp,current_timestamp)', [diag_id ,patient_id , description, doctor,Datedetected ,Datecured], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));

    })

  }



  const createlabdata = (request, response) => {
    
    const var1 = request.body;
    
   console.log(var1)

    let patient_id=var1["patient_id"];
    let lab_id=var1["lab_id"]; 
    let test_name=var1["test_name"];
    let date_test_taken=var1["date_test_taken"];
    let artifacts=var1["artifacts"];
    let reffered_by=var1["reffered_by"];
// response.send(JSON.stringify({enddate}));


  

    pool.query('INSERT INTO public.lab (patient_id, lab_id, test_name , date_test_taken , artifacts, reffered_by,created_at, updated_at) VALUES ($1, $2, $3 , $4 , $5 , $6  , current_timestamp,current_timestamp)', [patient_id ,lab_id, test_name, date_test_taken,artifacts ,reffered_by], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));

    })

  }



  const deletemeddata = (request, response) => {
    
    const var1 = request.body;


    let patient_id=var1["patient_id"];
    
    let MedicineName=var1["medication_name"];
  
   
    pool.query('DELETE FROM public.medication WHERE  patient_id = $1 AND medication_name = $2 ', [patient_id ,MedicineName], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));

    })

  }


  const deletediagdata = (request, response) => {
    
    const var1 = request.body;

    let patient_id=var1["patient_id"];
    
    let description=var1["description"];
    pool.query('DELETE FROM public.diagnosis WHERE  patient_id = $1 AND description = $2 ', [patient_id ,description], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));

    })

  }



  const deletelabdata = (request, response) => {
    
    const var1 = request.body;
    let patient_id=var1["patient_id"];
    let test_name=var1["test_name"];
    console.log(var1);

    
    pool.query('DELETE FROM public.lab WHERE  patient_id = $1 AND test_name = $2 ', [patient_id ,test_name], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));

    })

  }


  const createUser = (request, response) => {
    const var1 = request.body;
    
    console.log(var1);
    const min = Math.ceil(0);
    const max = Math.floor(2147);
    const patient_id = Math.floor(Math.random() * (max - min) + min);
    
    let MailAddress=var1["MailAddress"];
  
    let password=var1["password"];
    
    let query = "INSERT INTO public.USERS (patient_id,MAILADDRESS,PASSWORD,created_at, updated_at) VALUES(" + MailAddress +"," + password+");";
   
    pool.query('INSERT INTO public.users (patient_id,mailaddress,password,created_at, updated_at) VALUES ($1, $2,$3,current_timestamp,current_timestamp)', [patient_id  , MailAddress, password], (error, results) => {
      if (error) {
        throw error
      }
      
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify({results}));
      
      // response.json({results});
     

    })
  }
  
  const predictByModel = (request, response) => {
    const var1 = request.body;
    
    let concave_worst = var1['concave_worst']
    let concave_std = var1['concave_std']
    let texture_worst = var1['texture_worst']
    let smooth_worst = var1['smooth_worst']
    let symm_worst = var1['symm_worst']
    let symm_mean = var1['symm_mean']
    let radius_std = var1['radius_std']
    let compac_std = var1['compac_std']
    
    console.log(var1);
    
    const raw_output = []; // Store readings
    
    const { spawn } = require('child_process');
    const ls = spawn('python', ['predict.py',concave_worst,concave_std,texture_worst,smooth_worst,symm_worst,symm_mean,radius_std,compac_std]);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      raw_output.push((data));
    });
    
    ls.stderr.on('data', (data) => {
     console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      let prediction = parseFloat(raw_output);
      response.send(JSON.stringify({prediction}));
    });

  }
  
module.exports = {
getUsers,
getMedicationByID,
getUserById,
createUser,
createmeddata,
deletemeddata,
getdiagnosisByID,
creatediagdata,
deletediagdata,
deletelabdata,
createlabdata,
getlabByID,
predictByModel

}
