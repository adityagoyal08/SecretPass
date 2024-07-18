import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "", id: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };
  useEffect(() => {
    getpasswords();
  }, []);

  const copytext = (text) => {
    toast("🦄 Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const showPassword = () => {
    // alert("Show the password");
    console.log(ref.current.src);
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eye_close.svg")) {
      ref.current.src = "icons/OpenEye.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eye_close.svg";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    // form.site.length
    const { site, username, password } = form;

    if (!site || !username || !password) {
      toast.error("🦄 All Fields are required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // if same password is there
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });

    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    // );
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" });
    toast("🦄 password saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  //======================================================

// const savePassword = async () => {
//   const { site, username, password, id } = form;

//   if (!site || !username || !password) {
//     toast.error("🦄 All Fields are required!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//     });
//     return;
//   }

//   // If editing an existing entry, delete the old one
//   if (id) {
//     await fetch("http://localhost:3000/", {
//       method: "DELETE",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({ id }),
//     });

//     // Remove the old entry from passwordArray
//     const updatedPasswordArray = passwordArray.filter(passwordEntry => passwordEntry.id !== id);
//     setPasswordArray(updatedPasswordArray);
//   }

//   const newEntry = { ...form, id: uuidv4() };

//   // Add the new entry to passwordArray
//   setPasswordArray([...passwordArray, newEntry]);
//   await fetch("http://localhost:3000/", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(newEntry),
//   });

//   console.log([...passwordArray, newEntry]);
//   setform({ site: "", username: "", password: "" });
//   toast("🦄 Password saved", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });
// };

  //======================================================

  const deletePassword = async (id) => {
    console.log("editing the password with id", id);
    let c = confirm("Do you really wanna delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
    }
    toast("🦄 password deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.log([...passwordArray, form]);
  };

  const editPassword = (id) => {
    console.log("Editing the form with id", id);
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-2 md:myContainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            className="rounded-full border border-green-600 w-full p-4 py-1"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-green-600 w-full p-4 py-1"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                type="password"
                className="rounded-full border border-green-600 w-full p-4 py-1"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 h-7"
                  src="icons/OpenEye.svg"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-400 hover:bg-green-500 rounded-full px-4 py-2 w-fit border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-2xl font-bold py-4">Your password</h2>
          {passwordArray.length == 0 && <div>No passwords to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-500 text-white ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">username</th>
                  <th className="py-2">password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border-2 border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.site}</span>
                          <div
                            className="lordiconsopy size-7 cursor-pointer"
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border-2 border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconsopy size-7 cursor-pointer"
                            onClick={() => {
                              copytext(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border-2 border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconsopy size-7 cursor-pointer"
                            onClick={() => {
                              copytext(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border-2 border-white text-center w-32">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          {" "}
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          {" "}
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
