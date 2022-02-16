import { Link } from "react-router-dom";

export default function DeckForm({
    handleSubmit,
    handleCancel,
    formData,
    setFormData,
    title,
    subtitle,
    deck,
}) {
    const handleChange = ({ target }) => {

        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    return (
        <div>
            {!subtitle ? <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                </ol>
            </nav> : <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${deck.id}`} >{title}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{subtitle}</li>
                </ol>
            </nav>}
            

            
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-control" value={formData.name} type="text" onChange={handleChange} name="name" id="name" />

                <label className="form-label" htmlFor="desc">Description</label>
                <textarea className="form-control" value={formData.description} onChange={handleChange} name="description" id="desc" />

                <button onClick={handleCancel} style={{ margin: "8px" }} type="button" className="btn btn-secondary">Cancel</button>
                <button style={{ margin: "8px" }} type="submit" className="btn btn-primary">Submit</button>

            </form>


        </div>
    );
}