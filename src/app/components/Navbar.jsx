function Navbar({ language}) {
    const [ navbarData, setNavbarData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await NavbarRepository.getInstance().getModel();
            setNavbarData(data);
        }
        fetchData();
    }, []);

    if (!navbarData) return <nav>Loading...</nav>;

    return (
        <nav>
            <ul>
                {navbarData.items.map(item => (
                    <li key={item.id}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}