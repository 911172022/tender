export function phoneReg(value) {
    const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
    if (!phoneReg.test(value)) {
        return console.error("请输入正确的手机号码");
    }
}

export function emailReg(value) {
    const emailReg = / ^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$ /;
    if (!emailReg.test(value)) {
        return console.error("请输入正确的邮箱");
    }
}