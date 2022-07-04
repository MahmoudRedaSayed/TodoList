exports.dateDay=function(){
    let options={
        weekDay:"long",
        day:"numeric",
        month:"long"
    }
    const dateData=new Date();
    return dateData.getDay;
}