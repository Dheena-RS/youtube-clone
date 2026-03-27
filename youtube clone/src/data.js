export const API_KEY='AIzaSyAPqD_S5vVKPdE28l_ha0M42uj9t_j_-BI';

export const value_converter=(value)=>{
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}