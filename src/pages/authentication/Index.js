import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RowFormInputField from "@/components/authentication/RowFormInputField";
import { validationRequest } from "@/utils/validationRequest";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bannerImage from '@/assets/banner.jpg';
import systemLogo from '@/assets/logo.png';
import { useLoginMutation } from "@/store/apiSlice";
import { setCredentials } from "@/store/slice/authSlice";
import { useDispatch } from "react-redux";
const Index = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ password: "ADMIN*1dcg", username: "ADMINT" });
    const [errors, setErrors] = useState({});
    const [submitting, isSubmitting] = useState(false);
    const validationRules = {
        password: { required: true, minLength: 2, maxLength: 20 },
        username: { required: true, minLength: 2, maxLength: 20 },
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { isValid, errors } = validationRequest(formData, validationRules);
        setErrors(errors);
        if (!isValid) {
            toast.error("Please fill in all mandatory fields.", { position: "top-right", autoClose: 5000 });
            console.log("Validation Errors:", errors);
            return;
        }
        isSubmitting(true);
        try {
            localStorage.clear();
            const response = await login({ userName: formData.username, password: formData.password }).unwrap();
            if (response?.success) {
                dispatch(setCredentials({
                    token: response.success,
                    userId: response.userId,
                }));
                const authData = {
                    token: response.success,
                    userId: response.userId,
                    username: response.userDisplayName,
                    usertype: response.EmployeeType,
                    loginAt: Date.now(),
                };
                localStorage.setItem("auth_data", JSON.stringify(authData));
                toast.success("Login successful!", { position: "top-left", autoClose: 6000 });
                navigate("/dashboard");
            }
            else {
                toast.error("Invalid response format, token missing.", { position: "top-right", autoClose: 3000 });
            }
        }
        catch (err) {
            console.error("Login Error:", err);
            let apiError = "Please enter correct username and password.";
            if (err?.status === 422 && err?.data?.errors) {
                setErrors(err.data.errors);
                apiError = "Please correct the highlighted errors.";
            }
            else if (err?.data?.message) {
                apiError = err.data.message;
            }
            setErrors((prevErrors) => ({
                ...prevErrors,
                apiError,
            }));
            isSubmitting(false);
            toast.error('Login failed , Please try again.', { position: "top-right", autoClose: 3000 });
        }
        finally {
            isSubmitting(false);
        }
    };
    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        setErrors({ ...errors, [e.target.name]: "" });
    };
    return (_jsxs("div", { className: "row d-flex align-items-center justify-content-center position-relative", style: {
            minHeight: "100vh",
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    inset: 0,
                    // backgroundColor: "rgba(0,0,0,0.45)",
                } }), _jsx("div", { className: "col-11 col-sm-8 col-md-5 col-lg-4 position-relative", children: _jsx("div", { className: "tw-p-5 md:tw-p-6 tw-rounded-2xl tw-bg-white tw-shadow-lg", children: _jsx("div", { className: "tw-p-5 md:tw-p-6 tw-mb-4 tw-rounded-2xl tw-transition-all tw-duration-200 tw-bg-white tw-shadow-sm tw-ring-1 tw-ring-gray-200", children: _jsx("div", { className: "tw-flex tw-flex-col tw-gap-4 tw-dw-rounded-box tw-dw-p-6 tw-dw-max-w-md", style: {
                                backgroundColor: "rgba(255, 255, 255, 0.85)"
                            }, children: _jsxs("form", { method: "POST", onSubmit: handleFormSubmit, className: "shadow-lg p-5", id: "login-form", children: [_jsx("div", { className: "d-flex justify-content-center mb-4", children: _jsx("img", { src: systemLogo, alt: "Logo", className: "loginLogo" }) }), _jsx("h4", { className: "text-center tw-text-sm tw-font-medium tw-text-gray-500 text-primary", children: "V.O. CHIDAMBARANAR PORT" }), _jsx("h5", { className: "text-center", children: "DIRECT PORT ENTRY" }), _jsx(RowFormInputField, { label: "Username", name: "username", inputValue: formData.username, error: errors.username, required: true, onChange: handleChange }), _jsx(RowFormInputField, { label: "Password", name: "password", type: "password", inputValue: formData.password, error: errors.password, required: true, onChange: handleChange }), _jsx("div", { className: "d-flex justify-content-end pt-3", children: _jsxs("button", { type: "submit", className: `btn btn-success btn-sm px-4 form-control custom-form-control position-relative ${submitting ? "loading" : ""}`, disabled: submitting, style: {
                                                minWidth: "100px"
                                            }, children: [submitting && _jsx("span", { className: "spinner-center" }), !submitting && _jsx("span", { className: "btn-text", children: "Login" })] }) }), errors.apiError && (_jsx("p", { style: { fontSize: "11px" }, className: "text-danger bg-danger mt-2 text-white p-3", children: errors.apiError }))] }) }) }) }) })] }));
};
export default Index;
