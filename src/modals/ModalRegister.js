import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Modal } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { firebaseErrors } from "../utils/firebaseErros";
import styles from "../styles/ModalLogin.module.css";
import { useApi } from "../context/apiContext";

export const ModalRegister = ({ showRegister, setShowRegister, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);

  const signUp = useAuth().signUp;
  const [beUser, setBeUser] = useAuth().beUser;
  const loginWithGoogle = useAuth().loginWithGoogle;
  const saveToken = useAuth().saveToken;

  const createUserRequest = useApi().createUserRequest;
  const createLoginRequest = useApi().createLoginRequest;
  const createLoginWithGoogleRequest = useApi().createLoginWithGoogleRequest;

  const handleRegister = async (email, password, name) => {
    setIsLoading(true);
    await signUp(email, password)
      .then(async (userCredential) => {
        const newUser = {
          name,
          email,
          password
        };

        await createUserRequest(newUser)
          .then(async (res) => {
            const email = res.data.email;

            const userData = {
              email,
              password
            };

            await createLoginRequest(userData)
              .then((res) => {
                setShowRegister(false);
                setBeUser(res.data);
                console.log("SE HA REGISTRADO CORRECTAMENTE");
                console.log("SE HA LOGUEADO CORRECTAMENTE");
                saveToken(res.data.token);
                setHidden(true);
              })
              .catch((err) => {
                alert(err.response);
              });
          })
          .catch((err) => alert(err.response));
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
                console.log("SE HA LOGUEADO CORRECTAMENTE CON GOOGLE");
                saveToken(res.data.token);
                setShowRegister(false);
                setHidden(true);
              })
              .catch((err) => {
                alert(err.response);
              });
          })
          .catch((err) => alert(err.response));
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
      setIsLoading(false);
      setError("");
      setHidden(true);
    };
  }, [beUser]);

  return (
    <Modal
      show={showRegister}
      /* onHide={() => setShow(false)} */
    >
      <Modal.Header>
        <div className={`container ${styles.displayHeader}`}>
          <Modal.Title className={styles.modalTitle}>Registrarse</Modal.Title>
          <button
            className={styles.buttonGl}
            onClick={() => {
              setShowRegister(false);
              setTimeout(() => {
                setHidden(true);
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
            nombres: "",
            email: "",
            password: ""
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.nombres) {
              errores.nombres = "Ingrese sus nombres";
            }

            if (!valores.email) {
              errores.email = "Ingrese un email";
            }

            if (!valores.password) {
              errores.password = "Ingrese una contraseña";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            handleRegister(valores.email, valores.password, valores.nombres);
          }}
        >
          {({ errors, resetForm }) => (
            <div className={`container ${styles.containerForm}`}>
              <Form action="" className={styles.formulario}>
                <div className={styles.cont_input}>
                  <Field
                    type="text"
                    name="nombres"
                    id="nombres"
                    autoComplete="off"
                    placeholder=" "
                    className={styles.form__input}
                    disabled={isLoading}
                  />
                  <label className={styles.form__label} htmlFor="nombres">
                    Nombres
                  </label>
                </div>
                <ErrorMessage
                  name="nombres"
                  component={() => (
                    <div className={styles.error}>{errors.nombres}</div>
                  )}
                />

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
                    <ImSpinner9 className={styles.iconLoading} /> Registrando...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles.btnSubmitForm}
                    onClick={() => setError("")}
                  >
                    Registrarse
                  </button>
                )}

                <p className={styles.orP}>
                  <span className={styles.orSpan}>O</span>
                </p>
                <button
                  type="button"
                  className={`${styles.btnForm} ${styles.buttonGoogle}`}
                  onClick={() => handleGoogleSignIn()}
                >
                  <FcGoogle size={20} className={styles.iconGoogle} />
                  Regístrate con Google
                </button>
                <br />
                <div className={styles.link_register}>
                  <span>¿Ya tienes una cuenta?</span>
                  <button
                    type="button"
                    className={`${styles.btnForm} ${styles.buttonIsRegister}`}
                    onClick={() => {
                      setError("");
                      setShowRegister(false);
                      setShow(true);
                      setTimeout(() => {
                        setHidden(true);
                      }, 300);
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
