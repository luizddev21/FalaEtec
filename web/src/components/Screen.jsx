import Navbar from "./Navbar";

export default function Screen({ children, banner }) {
    return (
        <main className='screen'>
            {banner && <img src={banner} alt="Banner principal" className='hero-banner potrait' />}
            <div className="content">
                {banner && <img src={banner} alt="Banner principal" className='hero-banner landscape' />}
                { children }
            </div>
        </main>
    );
}

