import '../styles/SideNav.css'

export default function SideNav({homeFunc,favFunc,watchFunc}) {

    return (
        <section className="SideNav"> 
            <p onClick={homeFunc}>{"\u{1F3E0}"}</p>
            <p onClick={favFunc}>{"\u{1F31F}"}</p>
            <p onClick={watchFunc}>{"\u{1F3C1}"}</p>
        </section>
    );
}