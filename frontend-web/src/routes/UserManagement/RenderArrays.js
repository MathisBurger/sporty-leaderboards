import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {UserAction} from "./APIActions";

// renders the HTML by a list of all accepted user
export function renderAcceptedUser(arr) {
    var list = [];
    for (var i=0; i<arr.length; i++) {
        let usr = arr[i].username;
        list.push(
            <div className={"card-element"} key={i.toString()}>
                <div className={"card-element-text"}>{arr[i].username}</div>
                <button className={"card-element-button card-button-block"} onClick={() => UserAction(usr, '/block_user')}>
                    <FontAwesomeIcon icon={faBan} />
                </button>
            </div>
        );
    }
    return (
        <div>
            {list}
        </div>
    );
}

// renders the HTML by a list of all unaccepted user
export function renderUnacceptedUser(arr) {
    var list = [];
    for (var i=0; i<arr.length; i++) {
        let usr = arr[i].username;
        list.push(
            <div className={"card-element"} key={i.toString()}>
                <div className={"card-element-text"}>{arr[i].username}</div>
                <button className={"card-element-button card-button-accept"} onClick={() => UserAction(usr, '/accept_user')}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className={"card-element-button card-button-block"} onClick={() => UserAction(usr, '/block_user')}>
                    <FontAwesomeIcon icon={faBan} />
                </button>
            </div>
        );
    }
    return (
        <div>
            {list}
        </div>
    );
}

// renders the HTML by a list of all blocked user
export function renderBlockedUser(arr) {
    var list = [];
    for (var i=0; i<arr.length; i++) {
        let usr = arr[i].username;
        list.push(
            <div className={"card-element"} key={i.toString()}>
                <div className={"card-element-text"}>{arr[i].username}</div>
                <button className={"card-element-button card-button-pardon"} onClick={() => UserAction(usr, '/accept_user')}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
        );
    }
    return (
        <div>
            {list}
        </div>
    );
}



