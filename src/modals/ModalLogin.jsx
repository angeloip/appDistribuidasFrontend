import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Modal } from "react-bootstrap";
import { firebaseErrors } from "../utils/firebaseErros";
import styles from "../styles/ModalLogin.module.css";
import { ModalRegister } from "./ModalRegister";
import { useAuth } from "../context/authContext";
import { useApi } from "../context/apiContext";
import Swal from "sweetalert2";

export const ModalLogin = ({ show, setShow }) => {
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [beUser, setBeUser] = useAuth().beUser;
  const setUserRole = useAuth().userRole[1];
  const logIn = useAuth().logIn;
  const loginWithGoogle = useAuth().loginWithGoogle;
  const saveToken = useAuth().saveToken;
  const [isLoading, setIsLoading] = useState(false);

  const createUserRequest = useApi().createUserRequest;
  const createLoginRequest = useApi().createLoginRequest;
  const createLoginWithGoogleRequest = useApi().createLoginWithGoogleRequest;

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    await logIn(email, password)
      .then(async (userCredential) => {
        const user = {
          email: email,
          password: password
        };

        await createLoginRequest(user)
          .then((res) => {
            setBeUser(res.data);
            saveToken(res.data.token);
            setUserRole(res.data.role);
            setShow(false);

            setHidden(true);
            Toast.fire({
              icon: "success",
              title: `Bienvenido ${res.data.name}`
            });
          })
          .catch((err) => {
            const error = err.response;
            alert(error.data.errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = firebaseErrors(errorCode);
        setError(errorMessage);
      });
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await loginWithGoogle()
      .then(async (result) => {
        const user = result.user;

        const name = user.displayName;
        const email = user.email;
        const password = (+new Date()).toString();

        const newUser = {
          name,
          email,
          password
        };

        await createUserRequest(newUser)
          .then(async (res) => {
            const email = res.data.email;

            const userData = {
              email
            };

            await createLoginWithGoogleRequest(userData)
              .then((res) => {
                setBeUser(res.data);
                saveToken(res.data.token);
                setUserRole(res.data.role);
                setShow(false);
                setHidden(true);
                Toast.fire({
                  icon: "success",
                  title: `Bienvenido ${res.data.name}`
                });
              })
              .catch((err) => {
                const error = err.response;
                alert(error.data.errorMessage);
              });
          })
          .catch((err) => console.log(err));
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = firebaseErrors(errorCode);
        setError(errorMessage);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      setError("");
      setHidden(true);
      setShowReset(false);
      setShowRegister(false);
      setIsLoading(false);
    };
  }, [beUser]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);

          setTimeout(() => {
            setHidden(true);
            setError("");
          }, 300);
        }}
      >
        <Modal.Header>
          <div className={`container ${styles.displayHeader}`}>
            <Modal.Title className={styles.modalTitle}>
              Iniciar Sesión
            </Modal.Title>
            <button
              className={styles.buttonGl}
              onClick={() => {
                setShow(false);

                setTimeout(() => {
                  setHidden(true);
                  setError("");
                }, 300);
              }}
              disabled={isLoading}
            >
              <GrClose size={20} className={styles.iconClose} />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validate={(valores) => {
              let errores = {};

              if (!valores.email) {
                errores.email = "Ingrese un email";
              }

              if (!valores.password) {
                errores.password = "Ingrese una contraseña";
              }

              return errores;
            }}
            onSubmit={(valores) => {
              handleLogin(valores.email, valores.password);
            }}
          >
            {({ errors, resetForm }) => (
              <div className={`container ${styles.containerForm}`}>
                <Form action="" className={styles.formulario}>
                  <div className={styles.cont_input}>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder=" "
                      className={styles.form__input}
                      disabled={isLoading}
                    />
                    <label className={styles.form__label} htmlFor="email">
                      Correo
                    </label>
                  </div>
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className={styles.error}>{errors.email}</div>
                    )}
                  />

                  <div className={styles.cont_input}>
                    <Field
                      type={hidden ? "password" : "text"}
                      name="password"
                      id="password"
                      autoComplete="off"
                      placeholder=" "
                      disabled={isLoading}
                      className={`${styles.form__input} ${styles.inputPass}`}
                    />
                    {hidden ? (
                      <AiOutlineEyeInvisible
                        onClick={() => setHidden(false)}
                        className={styles.eye}
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={() => setHidden(true)}
                        className={styles.eye}
                      />
                    )}
                    <label className={styles.form__label} htmlFor="password">
                      Contraseña
                    </label>
                  </div>
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <div className={styles.error}>{errors.password}</div>
                    )}
                  />

                  {error ? (
                    <div className={styles.errorMessage}>
                      <p>{error}</p>
                    </div>
                  ) : null}

                  {isLoading ? (
                    <button
                      type="button"
                      className={styles.disabledButton}
                      disabled
                    >
                      <ImSpinner9 className={styles.iconLoading} />
                      Iniciando Sesión...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={styles.btnSubmitForm}
                      onClick={() => {
                        setError("");
                      }}
                    >
                      Iniciar Sesión
                    </button>
                  )}

                  <button
                    type="button"
                    className={`${styles.btnForm} ${styles.buttonForgotPass}`}
                    onClick={() => {
                      setShow(false);
                      setShowReset(true);
                      setTimeout(() => {
                        setHidden(true);
                        setError("");
                      }, 300);
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>

                  <div>
                    <p className={styles.orP}>
                      <span className={styles.orSpan}>O</span>
                    </p>
                    <button
                      type="button"
                      className={`${styles.btnForm} ${styles.buttonGoogle}`}
                      onClick={() => handleGoogleSignIn()}
                    >
                      <FcGoogle size={20} className={styles.iconGoogle} />
                      Acceder con Google
                    </button>
                    <br />
                    <div className={styles.link_register}>
                      <span>¿Aún no tienes una cuenta?</span>
                      <button
                        type="button"
                        className={`${styles.btnForm} ${styles.buttonIsRegister}`}
                        onClick={() => {
                          setShow(false);
                          setShowRegister(true);
                          setError("");
                          setHidden(true);
                        }}
                      >
                        Registrarse
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      {/* <ResetModal
        showReset={showReset}
        setShowReset={setShowReset}
        setShow={setShow}
      /> */}
      <ModalRegister
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        setShow={setShow}
      />
    </>
  );
};
