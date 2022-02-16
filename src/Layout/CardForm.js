export default function CardForm({
    handleDone,
    handleSave,
    formData,
    setFormData,
    label1,
    label2,
}) {

    const handleChange = ({ target }) => {

        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    return (
        <div>

            <form onSubmit={handleSave}>
                <label className="form-label" htmlFor="front">Front</label>
                <textarea className="form-control" value={formData.front} onChange={handleChange} type="text" name="front" id="front" />

                <label className="form-label" htmlFor="back">Back</label>
                <textarea className="form-control" value={formData.back} onChange={handleChange} type="text" name="back" id="back" />

                <button onClick={handleDone} style={{ margin: "8px" }} type="button" className="btn btn-secondary">{label1}</button>
                <button style={{ margin: "8px" }} type="submit" className="btn btn-primary">{label2}</button>
                

            </form>
        </div>
    );
}