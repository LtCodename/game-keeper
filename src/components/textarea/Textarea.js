import React from 'react';
import './Textarea.css';
import autosize from "autosize";

class Textarea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.textarea.focus();
        if (!this.props.noAutosize) autosize(this.textarea);
    }

    render() {

        return (
            <textarea
                  ref={c => (this.textarea = c)}
                  rows={1}
                  className={`textarea-gk ${this.props.additionalClass}`}
                  placeholder={this.props.placeholder}
                  value={this.props.value}
                  onChange={this.props.onChange}
                  onBlur={this.props.onBlur}
                  autoComplete={this.props.autoComplete}
            />
        )
    }
}

export default Textarea;
