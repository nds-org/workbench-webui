import Input from "@material-ui/core/Input";
import {useSelector} from "react-redux";

const css = `
.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: .3rem;
}
`;

const SearchCatalogHeader = (props: { searchQuery: string; setSearchQuery: Function; }) => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);

    return (
        <>
            <style>{css}</style>
            <div className='jumbotron bg-banner' style={{
                width: "100%",
                color: "white",
                backgroundImage: darkThemeEnabled ? "linear-gradient(rgba(100, 100, 0, 0.35),rgba(100, 100, 0, 0.35)),url('/catalog-banner.jpg')" : "linear-gradient(rgba(200, 0, 0, 0.35),rgba(200, 0, 0, 0.35)),url('/catalog-banner.jpg')",
                backgroundSize: "1800px 500px",
                backgroundRepeat: "round",
                padding: "80px",
                fontWeight: "bold",
            }}>
                <h1 style={{ paddingTop: "25px" }}>Explore Apps from { env?.customization?.org_name || 'NCSA' }</h1>
                <Input style={{ color: "white", width: "480px", fontWeight: 800 }} placeholder={"Search for apps..."} value={props.searchQuery} onChange={(e) => props.setSearchQuery(e.target.value)} />
            </div>
        </>
    );
}

export default SearchCatalogHeader;
