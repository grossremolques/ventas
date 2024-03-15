const SS_Empleados = '16PFj6aJMaIdoj-D0NLecEIdiOONkZLDaPnyU0muxBlw' //https://docs.google.com/spreadsheets/d/16PFj6aJMaIdoj-D0NLecEIdiOONkZLDaPnyU0muxBlw/edit#gid=152798628
const SheetRegistro = "Registro!A1:ZZZ";
class Usuarios {
    static async getActiveUsers() {
        try {
            let response = await ApiGoogleSheet.getResponse(SheetRegistro,SS_Empleados);
            response = response.result.values
            response = arrayToObject(response);
            let usersActive = response.filter(item => item.activo === 'Sí');
            usersActive = usersActive.map(item => {
                item.nombreCompleto = `${item.nombre} ${item.apellido}`
                return item
            })
            return usersActive
        } catch (e) {
            console.log(e)
        }
    }
    static async getUser() {
        let response = false;
        let email = await ApiGoogleSheet.getEmail();
        let personal = await this.getActiveUsers();
        if(personal.some(item => item.email_empresa == email)) {
            response = personal.find(item => item.email_empresa == email);
        }
        return response
    }
    static async getVendedores() {
        try {
            let usuarios = await this.getActiveUsers();
            let vendedores = usuarios.filter(item => item.puesto === 'Ventas');
            return vendedores
        } catch (e) {
            console.log(e)
        }
    }
}