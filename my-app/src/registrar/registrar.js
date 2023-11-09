
export function Registrar({user, setUser}){

return(
    <><>
    <div className="Registrar">
        <h1 className="titulo2">Registrar Producto</h1>
        <form className="form-registros">
            <h2>Ingresa el Nombre del producto:</h2>
            <input type="text" placeholder="Nombre del producto" />
            <h2>Agrega una Descripción</h2>
            <input type="text" placeholder="Ingresa la descripción del producto" />
            <h2>Ponle un precio $</h2>
            <input type="number" placeholder="Ingresa el precio del producto" />
            <button className="boton-enviar">Publicar</button>
        </form>
    </div>
    </>
   
    </>

);
}