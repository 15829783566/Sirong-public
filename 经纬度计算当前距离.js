const Rad = (d) => {
    return d * Math.PI / 180.0;
}
//lat 纬度
//lng 经度
const GetDistance = (lat2, lng2) => {
    let lat1, lng1
    lat1 = //当前纬度
    lng1 = //当前经度
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000); //输出为公里
    //s=s.toFixed(4);
    console.log(s, '公里');
    return s.toFixed(1);
}
