import { faBars, faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from 'components/base/Button';
import PhoenixFloatingLabel from 'components/base/PhoenixFloatingLabel';
import { useWizardFormContext } from 'providers/WizardFormProvider';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getRandomNumber } from 'helpers/utils';
import { useGetDndSensor } from 'hooks/useGetDndSensor';
const ColumnItem = ({ className, label, index, columnItem, cursor }) => {
    const { formData, setFormData } = useWizardFormContext();
    const [isFocused, setIsFocused] = useState(false);
    const { setNodeRef, attributes, listeners, isDragging, transition, transform } = useSortable({
        id: columnItem.id,
        data: {
            type: 'column',
            item: columnItem,
            index
        },
        disabled: isFocused
    });
    const handleChange = (e, field) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { columns: prev.columns.map(column => column.id === columnItem.id
                ? Object.assign(Object.assign({}, column), { [field]: e.target.value }) : column) })));
    };
    const handleClear = () => {
        setFormData(Object.assign(Object.assign({}, formData), { columns: formData.columns.filter(column => column.id !== columnItem.id) }));
    };
    const styles = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
        cursor: cursor ? 'grabbing' : 'pointer'
    };
    return (<div ref={setNodeRef} {...attributes} style={styles}>
      <div className={classNames(className, 'd-flex gap-3')}>
        <PhoenixFloatingLabel label={label} className="flex-1" startComponent={<div className="hover-body-highlight" {...listeners}>
              <FontAwesomeIcon icon={faBars}/>
            </div>} endComponent={<button className="btn p-0 lh-1" onClick={handleClear}>
              <FontAwesomeIcon className="text-body-quaternary text-opacity-50" icon={faCircleXmark}/>
            </button>}>
          <Form.Control type="text" placeholder="Board Name" value={columnItem.name} onBlur={() => setIsFocused(false)} onMouseDownCapture={() => setIsFocused(true)} onChange={(e) => handleChange(e, 'name')}/>
        </PhoenixFloatingLabel>

        <div>
          <Form.Control type="color" className="kanban-color-picker" value={columnItem.color} onChange={(e) => handleChange(e, 'color')}/>
        </div>
      </div>
    </div>);
};
const ColumnForm = () => {
    var _a;
    const { formData, setFormData } = useWizardFormContext();
    const [activeItem, setActiveItem] = useState(null);
    const [activeColumnIndex, setActiveColumnIndex] = useState(null);
    const sensor = useGetDndSensor();
    const handleAddNewColumn = () => {
        const updatedFormData = Object.assign({}, formData);
        updatedFormData.columns.push({
            id: getRandomNumber(2, 100),
            name: '',
            color: '#000000'
        });
        setFormData(updatedFormData);
    };
    const handleDragStart = (event) => {
        var _a, _b;
        const { active } = event;
        setActiveItem((_a = active.data.current) === null || _a === void 0 ? void 0 : _a.item);
        setActiveColumnIndex((_b = active.data.current) === null || _b === void 0 ? void 0 : _b.index);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const activeIndex = formData.columns.findIndex(item => item.id === active.id);
            const overIndex = formData.columns.findIndex(item => item.id === over.id);
            const reorderedItem = arrayMove(formData.columns, activeIndex, overIndex);
            const updatedFormData = Object.assign(Object.assign({}, formData), { columns: reorderedItem });
            setFormData(updatedFormData);
        }
    };
    return (<div>
      <p className="mb-4">
        These will be the <b>Columns</b> of your Kanban board. They represent
        discrete stages in work process. Columns can be Edited, Removed,
        Rearranged or Added in future.
      </p>

      <DndContext sensors={sensor} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {(_a = formData.columns) === null || _a === void 0 ? void 0 : _a.map((column, index) => (<SortableContext key={column.id} items={formData.columns.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <ColumnItem key={column.id} className="mb-5" label={`Column ${index + 1}`} index={index} columnItem={column}/>
          </SortableContext>))}
        <DragOverlay>
          {activeItem && activeColumnIndex !== null && (<ColumnItem label={`Column ${activeColumnIndex + 1}`} index={activeColumnIndex} columnItem={activeItem} cursor={true}/>)}
        </DragOverlay>
      </DndContext>

      <Button variant="phoenix-secondary" startIcon={<FontAwesomeIcon icon={faPlus}/>} className="w-100 fs-9" size="lg" onClick={handleAddNewColumn}>
        Add New Column
      </Button>
    </div>);
};
export default ColumnForm;
