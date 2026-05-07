const About = () => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Authors:</td>
                </tr>
                <tr>
                    <td>Nürgül Dinçer</td>
                </tr>
                <tr>
                    <td>Ayşem Akşit</td>
                </tr>
                <tr>
                    <td>Elif Yırtıcı</td>
                </tr>
                <tr>
                    <td>Ömer Faruk Balık</td>
                </tr>
                <tr>
                    <td style={{textAlign: 'left'}}>Date:</td>
                    <td style={{textAlign: 'left'}}> {new Date().toLocaleDateString()}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default About