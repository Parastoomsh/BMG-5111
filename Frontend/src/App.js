import "./App.css";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    name: "",
    lastName: "",
    age: "",
    dateBirth: "",
    gender: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postCode: "",
    occupation: "",
    emergancyContactName: "",
    emergancyContactLastName: "",
    relationship: "",
    Concave_worse: "",
    Concave_standard: "",
    Symmetry_worse: "",
    Symmetry_standard: "",
    Texture_worse: "",
    Texture_standard: "",
    Smoothness_worse: "",
    Redius: "",
  });
  const [prediction, setPrediction] = useState("");
  const [validateUserInput, setValidateUserInput] = useState({
    name: true,
    lastName: true,
    age: true,
    dateBirth: true,
    gender: true,
    email: true,
    address1: true,
    address2: true,
    city: true,
    province: true,
    postCode: true,
    occupation: true,
    emergancyContactName: true,
    emergancyContactLastName: true,
    relationship: true,
    Concave_worse: true,
    Concave_standard: true,
    Symmetry_worse: true,
    Symmetry_standard: true,
    Texture_worse: true,
    Texture_standard: true,
    Smoothness_worse: true,
    Redius: true,
  });
  const [validateForm, setValidateForm] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();

    const body_request = {
      concave_worst: userInput.Concave_worse,
      concave_std: userInput.Concave_standard,
      symm_worst: userInput.Symmetry_worse,
      symm_mean: userInput.Symmetry_standard,
      texture_worst: userInput.Texture_worse,
      compac_std: userInput.Texture_standard,
      smooth_worst: userInput.Smoothness_worse,
      radius_std: userInput.Redius,
    };

    const body_request_json = JSON.stringify(body_request);
    console.log(body_request_json);
    fetch("http://localhost:3000/api/predictByModel", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: body_request_json,
    }).then((res) => {
      if (res.ok === true) {
        setValidateForm(true);
      } else {
        setValidateForm(false);
      }
      console.log(res);
      res.json().then(data => ({
        data: data,
    })).then(res => {console.log(res.data.prediction);setPrediction(res.data.prediction)});
    });
  };

  return (
    <div className="App">
      {!validateForm && (
        <div>
          <h1 className="title">breast cancer statuse form</h1>
          <form onSubmit={submitHandler}>
            <div className="personal_container">
              <div className="container_name">
                <lable for="Name" className="lable">
                  Name:
                </lable>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter your first name"
                  className={
                    validateUserInput.name ? "regular-input" : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({ ...userInput, name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className={
                    validateUserInput.lastName ? "regular-input" : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({ ...userInput, lastName: e.target.value });
                  }}
                />
              </div>

              <div>
                <lable for="age" className="lable">
                  age:
                </lable>
                <input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  className={
                    validateUserInput.age ? "regular-input" : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({ ...userInput, age: e.target.value });
                  }}
                />
              </div>
              <div>
                <lable for="birth" className="lable">
                  Date of Birth:
                </lable>
                <input
                  id="birth"
                  type="date"
                  placeholder="Enter your date birth"
                  className={
                    validateUserInput.dateBirth
                      ? "regular-input"
                      : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({ ...userInput, dateBirth: e.target.value });
                  }}
                />
              </div>
              <div>
                <lable for="gender" className="lable">
                  Gender:
                </lable>
                <select
                  name="cars"
                  id="gender"
                  className={
                    validateUserInput.gender ? "regular-input" : "error_input"
                  }
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div>
                <lable for="email" className="lable">
                  Email:
                </lable>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={validateUserInput.email ? "email" : "email_error"}
                  onChange={(e) => {
                    setUserInput({ ...userInput, email: e.target.value });
                  }}
                />
              </div>
              <div>
                <h3 className="lable">Adress:</h3>
                <div className="container_address">
                  <input
                    id="adress"
                    type="text"
                    placeholder="Street Adress"
                    className={
                      validateUserInput.address1 ? "email" : "email_error"
                    }
                    onChange={(e) => {
                      setUserInput({ ...userInput, address1: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Street Adress Line 2"
                    className={
                      validateUserInput.address2 ? "email" : "email_error"
                    }
                    onChange={(e) => {
                      setUserInput({ ...userInput, address2: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className={
                      validateUserInput.city ? "regular-input" : "error_input"
                    }
                    onChange={(e) => {
                      setUserInput({ ...userInput, city: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="State/province"
                    className={
                      validateUserInput.province
                        ? "regular-input"
                        : "error_input"
                    }
                    onChange={(e) => {
                      setUserInput({ ...userInput, province: e.target.value });
                    }}
                  />
                  <div>
                    <input
                      type="text"
                      placeholder="Postal/Zip Code"
                      className={
                        validateUserInput.postCode
                          ? "regular-input"
                          : "error_input"
                      }
                      onChange={(e) => {
                        setUserInput({
                          ...userInput,
                          postCode: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <lable for="occupation" className="lable">
                  Occupation:
                </lable>
                <input
                  id="occupation"
                  type="text"
                  className={
                    validateUserInput.occupation
                      ? "regular-input"
                      : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({ ...userInput, occupation: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="personal_container">
              <div className="emergancy_container">
                <lable for="emergancy" className="lable">
                  Emergancy Contact Person
                </lable>
                <input
                  id="emergancy"
                  type="text"
                  placeholder="Firs Name"
                  className={
                    validateUserInput.emergancyContactName
                      ? "regular-input"
                      : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      emergancyContactName: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={
                    validateUserInput.emergancyContactLastName
                      ? "regular-input"
                      : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      emergancyContactLastName: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <lable for="relationship" className="lable">
                  Relationship:
                </lable>
                <input
                  id="relationship"
                  type="text"
                  className={
                    validateUserInput.relationship
                      ? "regular-input"
                      : "error_input"
                  }
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      relationship: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="main_container">
              <div className="container_new">
                <lable className="lable1">Concave point(Worse)</lable>
                <input
                  className={
                    validateUserInput.Concave_worse
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Concave_worse: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Concave point(Standard Error)</lable>
                <input
                  className={
                    validateUserInput.Concave_standard
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Concave_standard: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Symmetry(Worse)</lable>
                <input
                  className={
                    validateUserInput.Symmetry_worse
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Symmetry_worse: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Symmetry(Mean)</lable>
                <input
                  className={
                    validateUserInput.Symmetry_standard
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Symmetry_standard: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Texture(Worse)</lable>
                <input
                  className={
                    validateUserInput.Texture_worse
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Texture_worse: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Compactness(Standard Error)</lable>
                <input
                  className={
                    validateUserInput.Texture_standard
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Texture_standard: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Smoothness(Worse)</lable>
                <input
                  className={
                    validateUserInput.Smoothness_worse
                      ? "regular-input"
                      : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({
                      ...userInput,
                      Smoothness_worse: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="container_new">
                <lable className="lable1">Redius(Standard Error)</lable>
                <input
                  className={
                    validateUserInput.Redius ? "regular-input" : "error_input"
                  }
                  type="text"
                  onChange={(e) => {
                    setUserInput({ ...userInput, Redius: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <h1 className="title1">Authorization and Consent</h1>
              <p>
                I confirm that all information given in this form is true,
                complete and accurate. I released this organization for any
                responsibility in case of accident, illness or injury. I
                acknowledge that no assurance was offered about the outcome.I
                acknowledge that i received an informed consent document and the
                health staff explained it to me throughly. HIPAA:I confirmed
                that i have read and recieved the HIPAA privacy practices of
                this chiropractor's office regarding protect health information
              </p>
              <textarea className="explaination" />
            </div>

            <button type="submit" className="button">
              submit
            </button>
          </form>
        </div>
      )}
      {validateForm && (
        <div>
          <h4>Prediction:</h4>
          <p>{prediction}%</p>
        </div>
      )}
    </div>
  );
}

export default App;

