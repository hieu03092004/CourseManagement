export default function Title(props:{
    text:String
}){
    const {text= " "}=props;
    return(
        <>
            <div className="font-[700] text-[44px] text-primary text-center mb-[60px]">
                {text}
            </div>
        </>
    )
}