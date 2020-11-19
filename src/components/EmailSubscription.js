import React from 'react'
import { navigate } from 'gatsby-link'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

export default class EmailSubscription extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('email'),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch(error => alert(error))
    }

    render() {
        return (
            <form
                name="signup"
                method="post"
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
            >
                <section className="section">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <h3>Enter your email below to be notified of new posts!</h3>
                        </div>
                    </div>
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div class="control has-icons-left has-icons-right">
                                <input class="input"
                                    type={'email'}
                                    name={'email'}
                                    onChange={this.handleChange}
                                    id={'email'}
                                    required={true}
                                    placeholder="Email" />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-link" type="submit">
                            Send
                  </button>
                    </div>
                    <div hidden>
                        <label>
                            Don’t fill this out:{' '}
                            <input name="bot-field" onChange={this.handleChange} />
                        </label>
                    </div>
                </section>
            </form>
        )
    }
}