import { useState } from "react";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const submitForm = (e, formType: string) => {
    e.preventDefault();
    if (formType === "login") {
      fetch(`http://localhost:8080/login`, {
        method: "POST",
        body: JSON.stringify(form),
      })
        .then((req) => {
          console.log("req");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    } else {
      return;
    }
  };

  const updateForm = (e, formType: string) => {
    const name = e.target.name;
    const value = e.target.value;

    if (formType === "login") {
      setForm((prevForm) => {
        return {
          ...prevForm,
          [name]: value,
        };
      });
    } else {
      setRegistrationForm((prevForm) => {
        return { ...prevForm, [name]: value };
      });
    }
  };

  const LoginModal = () => {
    return (
      <form onSubmit={(e) => submitForm(e, "login")}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => updateForm(e, "login")}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => updateForm(e, "login")}
          value={form.password}
          placeholder="Password"
        />
      </form>
    );
  };

  const RegistrationModal = () => {
    return (
      <form onSubmit={(e) => submitForm(e, "registration")}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          onChange={(e) => updateForm(e, "registration")}
          value={registrationForm.username}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={registrationForm.email}
          onChange={(e) => updateForm(e, "registration")}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={registrationForm.password}
          onChange={(e) => updateForm(e, "registration")}
        />
        <input
          type="password"
          name="repassword"
          id="repassword"
          placeholder="Enter password again"
          value={registrationForm.repassword}
          onChange={(e) => updateForm(e, "registration")}
        />
      </form>
    );
  };

  return <div>{isSignup ? <RegistrationModal /> : <LoginModal />}</div>;
}
