export function isNotNULL(object) {
    if (object !== null &&
        object !== undefined &&
        object !== '') {
        return true;
    }
    return false;
}

export function isNumeric(object) {
    var regex = /^[0-9$]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    if (regex.test(object)) {
        return true;
    } else if (isNotNULL(object) && isNotNULL(object.$$typeof) && typeof object.$$typeof === 'symbol') {
        if (object.props.prefix === "$") {
            return true;
        } else if (!(object.props.children instanceof Array)) {
            if (regex.test(object.props.children)) {
                return true;
            } else if (isNotNULL(object.props.children) && isNotNULL(object.props.children.props) && object.props.children.props.prefix === "$") {
                return true;
            }
        } else if (object.props.children instanceof Array) {
            if (regex.test(object.props.children[0]) || regex.test(object.props.children[1])) {
                return true;
            } else if (isNotNULL(object.props.children[1].props) && object.props.children[1].props.prefix === "$") {
                return true;
            }
        }
    }
    return false;
}

export function isText(object) {
    var regex = /^[A-Za-z\d\s-#_+*'&.",:)(]*$/;

    if (regex.test(object)) {
        return true;
    } else if (isNotNULL(object) && isNotNULL(object.$$typeof) && typeof object.$$typeof === 'symbol') {
        return true;
    }
    return false;
}
