import PhoenixOffcanvas from 'components/base/PhoenixOffcanvas';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import RoomFilterOffcanvasContent from './RoomFilterOffcanvasContent';
const RoomFilterOffcanvas = ({ open, setOpen }) => {
    const { breakpoints } = useBreakpoints();
    return (<>
      {breakpoints.down('xl') && (<PhoenixOffcanvas open={open} onHide={() => setOpen(false)} className="p-4 phoenix-offcanvas-content scrollbar phoenix-room-filter-offcanvas" placement="start" fixed>
          <RoomFilterOffcanvasContent setOpen={setOpen}/>
        </PhoenixOffcanvas>)}
    </>);
};
export default RoomFilterOffcanvas;
