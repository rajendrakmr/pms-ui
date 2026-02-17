import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faMoon, faSun, faExpand, faCompress, faRightFromBracket, } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import BredCrumbs from "./BredCrumbs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = ({ setIsToggle, isToggle }) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("en");
    const navigate = useNavigate();
    const handleProfileClick = () => setShowProfileModal(true);
    const handleCloseProfileModal = () => setShowProfileModal(false);
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        toast.success("Logout Successfully", { position: "top-right", autoClose: 6000 });
        navigate("/login");
    };
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };
    const changeLanguage = (lang) => setLanguage(lang);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleNotificationClick = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
            else {
                const docElem = document.documentElement;
                if (docElem.requestFullscreen) {
                    await docElem.requestFullscreen();
                }
                else if (docElem.mozRequestFullScreen) {
                    await docElem.mozRequestFullScreen();
                }
                else if (docElem.webkitRequestFullscreen) {
                    await docElem.webkitRequestFullscreen();
                }
                else if (docElem.msRequestFullscreen) {
                    await docElem.msRequestFullscreen();
                }
                setIsFullscreen(true);
            }
        }
        catch (error) {
            console.error("Fullscreen toggle failed", error);
        }
    };
    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        const sidebar = document.querySelector('.rk_sidebar');
        if (sidebar) {
            sidebar.classList.toggle('dark-mode', isDarkMode);
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);
    return (_jsxs("div", { className: `header-container d-flex justify-content-between align-items-center p-3 sticky-header ${isToggle ? "headerToggleContainer" : ""}`, children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("button", { className: "sidebar-toggle btn btn-light me-2", onClick: () => setIsToggle(!isToggle), children: _jsx(FontAwesomeIcon, { icon: faBars, size: "lg" }) }), _jsx(BredCrumbs, {})] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { className: "theme-toggle me-3", onClick: toggleTheme, children: _jsx(FontAwesomeIcon, { icon: isDarkMode ? faSun : faMoon, size: "lg", className: "text-primary" }) }), _jsx("div", { className: "notification me-3", onClick: handleNotificationClick, style: { cursor: "pointer" }, children: _jsx(FontAwesomeIcon, { icon: isFullscreen ? faCompress : faExpand, size: "lg", className: "text-primary" }) }), _jsxs(Dropdown, { align: "end", children: [_jsx(Dropdown.Toggle, { style: { backgroundColor: "#2343" }, id: "dropdown-profile", className: "profile-dropdown-toggle", children: _jsx(FontAwesomeIcon, { icon: faUser, size: "lg" }) }), _jsxs(Dropdown.Menu, { children: [_jsxs(Dropdown.Item, { onClick: handleProfileClick, className: "d-flex align-items-center gap-2", children: [_jsx(FontAwesomeIcon, { icon: faUser }), _jsx("span", { children: "Profile" })] }), _jsxs(Dropdown.Item, { onClick: (e) => logout(e), className: "d-flex align-items-center gap-2 text-danger", children: [_jsx(FontAwesomeIcon, { icon: faRightFromBracket }), _jsx("span", { children: "Logout" })] })] })] })] }), _jsxs(Modal, { show: showProfileModal, onHide: handleCloseProfileModal, centered: true, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Profile" }) }), _jsx(Modal.Body, { children: _jsx("p", { children: "User profile details..." }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "secondary", onClick: handleCloseProfileModal, children: "Close" }) })] })] }));
};
export default Header;
