import React, { PropTypes, Component } from 'react'

const iconList = [
  <% _.forEach(icons, function (icon) {%> '<%= icon.name %>', <% }) %>
]

class <%= label %> extends Component {

  constructor () {
    super()
    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon () {
    switch (this.props.type) {
      default:
        return null;
      <% _.forEach(icons, function (icon) {%>
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

<%= label %>.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(iconList).isRequired
}

export default <%= label %>
