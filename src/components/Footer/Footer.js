import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

function Footer({ tasksCounter, onFilterChange, filterType, onClearCompleted }) {
  Footer.defaultProps = {
    filterType: 'All',
  }

  Footer.propTypes = {
    tasksCounter: PropTypes.number.isRequired,
    filterType: PropTypes.string,
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {tasksCounter}
        items left
      </span>
      <TasksFilter onFilterChange={onFilterChange} filterType={filterType} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
