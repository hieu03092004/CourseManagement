import CardItem from "./CardItem"
export default function CardList(){
    return(
        <>
            <div className="grid grid-cols-3 gap-[30px] max-w-[1320px] mx-auto px-[7.5px]">
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
                <CardItem/>
            </div>
        </>
    )
}