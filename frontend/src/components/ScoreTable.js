import '../css/scoreTable.css'

function ScoreTable({scoreTable}) {
    return (
        <section id="scoreTable">
                <table>
                    <thead>
                        <tr>Users score</tr>
                    </thead>
                    <tbody>
                        {Array.isArray(scoreTable) && scoreTable.slice(0, 5).map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.userName}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </section>
    )
}
export default ScoreTable;