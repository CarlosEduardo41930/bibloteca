import home from "../assets/icones/home_24dp_28D2EC_FILL0_wght400_GRAD0_opsz24.svg";
import livro from "../assets/icones/import_contacts_24dp_28D2EC_FILL0_wght400_GRAD0_opsz24.svg"
import lists from "../assets/icones/list_24dp_28D2EC_FILL0_wght400_GRAD0_opsz24.svg";
import add from "../assets/icones/add_24dp_28D2EC_FILL0_wght400_GRAD0_opsz24.svg";
import ajustes from "../assets/icones/build_24dp_28D2EC_FILL0_wght400_GRAD0_opsz24.svg";

function Nav() {
  const lista = {
    display: "flex",
    color: "#96a2b7",
    flexDirection: "row",
    gap: "11px",
    alignItems: "center",
  };
  

  return (
    <>
      <div className="flex flex-col  gap-10 p-10 bg-[#111629]">
        <div className="flex flex-row gap-2">
          <img src={livro} alt="icone de livro" className="w-8 h-12 text-[#28d2ec]" />
          <h1 className="text-2xl text-[#28d2ec]">LibManager</h1>
        </div>
        <ul className="flex flex-col justify-between gap-6">
          <li style={lista}>
            <img
              src={home}
              alt="icone de inicio"
              className="w-6 "
            />
            <a href="">Início</a>
          </li>
          <li style={lista}>
            <img
              src={lists}
              alt="icone de listar livro"
              className="w-6 "
            />{" "}
            <a href="">Listar Livros</a>
          </li>
          <li style={lista}>
            <img
              src={add}
              alt="icon de novo livro"
              className="w-6 "
            />{" "}
            <a href="">Novo Livro</a>
          </li>
          <li style={lista}>
            <img
              src={ajustes}
              alt="icon de ajuste"
              className="w-6 "
            />{" "}
            <a href="">Ajustes</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
