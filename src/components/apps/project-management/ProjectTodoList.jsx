import { faFilter, faPlus, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from '@globals/g-components/base/Button';
import SearchBox from '@globals/g-components/common/SearchBox';
import TodoItemDetailsOffcanvas from '@globals/g-components/modules/project-management/todo-list/TodoItemDetailsOffcanvas';
import TodoListItem from '@globals/g-components/modules/project-management/todo-list/TodoListItem';
import { todoList } from '@globals/g-data/project-management/todoListData';
import { useEffect, useState } from 'react';
const ProjectTodoList = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedItem]);
    return (<div className="mb-9">
      <h2 className="mb-4">
        Todo list<span className="text-body-tertiary fw-normal">(23)</span>
      </h2>
      <div className="d-flex align-items-center flex-wrap gap-x-5 gap-y-3 mb-3">
        <SearchBox placeholder="Search tasks" style={{ maxWidth: '30rem' }}/>
        <div>
          <Button variant="link" className="p-0 fs-9 text-body-tertiary text-decoration-none me-3" startIcon={<FontAwesomeIcon icon={faFilter} className="fs-10 me-1"/>}>
            23 tasks
          </Button>
          <Button variant="link" className="p-0 fs-9 text-primary text-decoration-none" startIcon={<FontAwesomeIcon icon={faSort} className="fs-10"/>}>
            Sorting
          </Button>
        </div>
      </div>
      <div className="todolist-container ms-n1 ps-1 scrollbar">
        {todoList.map((todo, index) => (<TodoListItem key={todo.task} todo={todo} className={classNames({
                'border-top': index === 0
            })} fullLayoutBreakpoints={['md']} onClick={item => setSelectedItem(item)}/>))}
      </div>
      <Button startIcon={<FontAwesomeIcon icon={faPlus}/>} variant="link" className="text-decoration-none p-0 mt-4">
        Add new task
      </Button>
      <TodoItemDetailsOffcanvas handleClose={() => setSelectedItem(null)} item={selectedItem}/>
    </div>);
};
export default ProjectTodoList;
