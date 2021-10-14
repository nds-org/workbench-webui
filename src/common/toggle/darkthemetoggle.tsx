import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {toggleDarkTheme} from "../../store/actions";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon";


const DarkThemeToggle = () => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const dispatch = useDispatch();

    return (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={darkThemeEnabled} onChange={() => dispatch(toggleDarkTheme())} />
                <FontAwesomeIcon icon={darkThemeEnabled ? faMoon : faSun} />
            </div>
        </>
    );
};

export default DarkThemeToggle;
