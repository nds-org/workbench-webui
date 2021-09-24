import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {toggleDarkTheme} from "../../store/actions";
import {faCloudMoon, faCloudSun} from "@fortawesome/free-solid-svg-icons";


const DarkThemeToggle = () => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const dispatch = useDispatch();
// <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{darkThemeEnabled ? 'Dark' : 'Default'}</label>
    return (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={darkThemeEnabled} onChange={() => dispatch(toggleDarkTheme())} />
                <FontAwesomeIcon icon={darkThemeEnabled ? faCloudMoon : faCloudSun} />
            </div>
        </>
    );
};

export default DarkThemeToggle;
