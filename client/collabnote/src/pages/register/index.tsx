import {KeyboardEvent, useContext, useState} from "react";
import useWindowSize from "../../hooks/use-window-size";
import {Link, useNavigate} from "react-router-dom";
import validator from "validator";
import {ToastContext} from "../../contexts/toast-context";
import AuthService from "../../services/auth-service";
import axios, {AxiosError} from "axios";
import TextField from "../../components/atoms/text-fields/text-fields";
import Logo from "../../components/atoms/logo/logo";


const Register = () => {
    const {widthStr, heightStr} = useWindowSize();
    const [email, setEmail] = useState("");
    const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);
    const [password_register, setPassword_register] = useState("");
    const [password_registerErrors, setPassword_registerErrors] = useState<Array<string>>([]);
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [password_confirmationErrors, setPassword_confirmationErrors] = useState<Array<string>>([]);
  
    const navigate = useNavigate();
    const { addToast, error } = useContext(ToastContext);

    const validate = () => {
      setEmailErrors([]);
      setPassword_registerErrors([]);
      setPassword_confirmationErrors([]);
      let isValid = true;
  
      if (!validator.isEmail(email)) {
        setEmailErrors(["Must enter a valid email"]);
        isValid = false;
      }
      if (!(password_register.length >= 8 && password_register.length <= 25)) {
        setPassword_registerErrors((prev) => [
          ...prev,
          "Password must be between 1 and 25 characters",
        ]);
        isValid = false;
      }
      if (!/\d/.test(password_register)) {
        setPassword_registerErrors((prev) => [
          ...prev,
          "Password must contain at least 1 number",
        ]);
        isValid = false;
      }
      if (password_register !== password_confirmation) {
        setPassword_confirmationErrors(["Passwords do not match"]);
        isValid = false;
      }
  
      return isValid;
    };
    const register = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
          await AuthService.register({
              email,
              password_register,
              password_confirmation,
            })
          
            addToast({
              title: `Successfully registered ${email}!`,
              body: "Please check your email to verify your account",
              color: "success",
            });
            navigate("/login");
        }
        catch (err) {
          if (axios.isAxiosError(err)) {
            const { response } = err as AxiosError;
            const errors = (response as any).data.errors;
            const emailFieldErrors = errors
              .filter((error: any) => error.param === "email")
              .map((error: any) => error.msg);
            const password_registerFieldErrors = errors
              .filter((error: any) => error.param === "password_register")
              .map((error: any) => error.msg);
            const password_confirmationFieldErrors = errors
              .filter((error: any) => error.param === "password_confirmation")
              .map((error: any) => error.msg);
    
            if (emailFieldErrors) setEmailErrors(emailFieldErrors);
            if (password_registerFieldErrors) setPassword_registerErrors(password_registerFieldErrors);
            if (password_confirmationFieldErrors) setPassword_confirmationErrors(password_confirmationFieldErrors);
    
            if (!emailFieldErrors && !password_registerFieldErrors && !password_confirmationFieldErrors) {
              error("An unknown error has occured. Please try again");
            }
          } 
          else {
            error("An unknown error has occured. Please try again");
          }
        } 
        finally {
          setLoading(false);
        }
      };

      const handleOnKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Enter") register();
      };
    
      const handleOnInputEmail = (value: string) => {
        setEmailErrors([]);
        setEmail(value);
      };
    
      const handleOnInputPassword_register = (value: string) => {
        setPassword_registerErrors([]);
        setPassword_register(value);
      };
    
      const handleOnInputPassword_confirmation = (value: string) => {
        setPassword_confirmationErrors([]);
        setPassword_confirmation(value);
      };

      return (
        <div
        onKeyPress={handleOnKeyPress}
        className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary" 
        style={{ width: widthStr, height: heightStr }}
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded border-primary shawdow-md border dark:border-0 dark:shadow-xl p-6 ">
            <div className="flex flex-col space-y-4">
              <div className="w-full text-center flex-col justify-center items-center flex items-center">
                <Logo/>
                <h1 className="text-cyan-500 font-bold text-3xl">Collaborative Note-Taking</h1>
                <h1 className="text-cyan-500 font-bold text-2xl">Sign up</h1>
              </div>
            <TextField
              value={email}
              onInput={handleOnInputEmail}
              label="Email"
              color="secondary"
              errors={emailErrors}
            />
            <TextField
              value={password_register}
              onInput={handleOnInputPassword_register}
              label="Password"
              type="password"
              color="secondary"
              errors={password_registerErrors}
            />
            <TextField
              value={password_confirmation}
              onInput={handleOnInputPassword_confirmation}
              label="Confirm Password"
              type="password"
              color="secondary"
              errors={password_confirmationErrors}
            />
              <button
                onClick={register}
                disabled={loading}
                className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1">
                <span className={`${loading && "opacity-0"}`}>Register</span>
              </button>

              <div className="w-full flex justify-end items-center">
                <Link
                  to="/login"
                  className="text-sm hover:underline font-semibold text-blue-500 text-right">
                  Have an account?
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 text-sm p-4">
            <button className="hover:underline font-semibold text-blue-500">
              Terms
            </button>
            <button className="hover:underline font-semibold text-blue-500">
              Privacy Policy
            </button>
          </div>
        </div>
      );
};

export default Register;