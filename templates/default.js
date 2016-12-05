import React, { PropTypes, Component } from 'react'

const iconList = [
  <% _forEach(icons, function (icon) {%> '<%= icon.name %>', <% }) %>
]

class <%= name %> extends Component {

  constructor () {
    super()
    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon () {
    switch (this.props.type) {
      default:
        return null;
      <% _forEach(icons, function (icon) {%>
      case '<%= icon.name %>':
        return (
          <%= icon.content %>
        );
      <% }) %>
    }
  }

  render () {
    const { className, ...attributes } = this.props

    return (
      <div {...attributes} className={className}>
        {this.renderIcon()}
      </div>
    )
  }
}

<%= name %>.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default <%= name %>
