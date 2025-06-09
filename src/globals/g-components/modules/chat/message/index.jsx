import classNames from 'classnames';
import Avatar from '@globals/g-components/base/Avatar';
import Lightbox from '@globals/g-components/base/LightBox';
import { actions } from '@globals/g-data/chat';
import useLightbox from '@globals/g-hooks/useLightbox';
import MessageActionButtons from './MessageActionButtons';
import MessageAttachments from './MessageAttachments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import AttachmentPreview from '@globals/g-components/common/AttachmentPreview';
const Message = ({ message, user, showActions = true }) => {
  var _a, _b, _c, _d, _e;
  const { lightboxProps, openLightbox } = useLightbox(
    ((_a = message.attachments) === null || _a === void 0
      ? void 0
      : _a.images) || []
  );
  return (
    <div className="d-flex chat-message">
      <div
        className={classNames('d-flex flex-1', {
          'justify-content-end': message.type === 'sent'
        })}
      >
        <div
          className={classNames('w-100', {
            'w-xxl-75': showActions
          })}
        >
          <div
            className={classNames('d-flex hover-actions-trigger', {
              'flex-end-center': message.type === 'sent'
            })}
          >
            {message.type === 'received' && (
              <Avatar
                src={user.avatar}
                size="m"
                className="me-3 flex-shrink-0"
              />
            )}

            {message.type === 'sent' && showActions && (
              <MessageActionButtons actions={actions} variant="sent" />
            )}

            <div
              className={classNames('chat-message-content me-2', {
                received: message.type === 'received'
              })}
            >
              <div
                className={classNames('mb-1', {
                  'sent-message-content ': message.type === 'sent',
                  'received-message-content border border-translucent':
                    message.type === 'received',
                  attachments:
                    Number(
                      (_c =
                        (_b = message.attachments) === null || _b === void 0
                          ? void 0
                          : _b.images) === null || _c === void 0
                        ? void 0
                        : _c.length
                    ) > 0 && !message.message
                })}
              >
                {message.message && <p className="mb-0">{message.message}</p>}
                {((_d = message.attachments) === null || _d === void 0
                  ? void 0
                  : _d.images) && (
                  <MessageAttachments
                    attachments={message.attachments.images}
                    openLightbox={openLightbox}
                  />
                )}
                {((_e = message.attachments) === null || _e === void 0
                  ? void 0
                  : _e.file) && (
                  <AttachmentPreview
                    attachment={message.attachments.file}
                    variant={
                      message.type === 'received' ? 'primary' : 'secondary'
                    }
                  />
                )}
              </div>
            </div>
            {message.type === 'received' && showActions && (
              <MessageActionButtons
                actions={actions.slice(1)}
                variant="received"
              />
            )}
          </div>
          <div
            className={classNames('d-flex gap-1 fs-10', {
              'ms-7': message.type === 'received',
              'justify-content-end': message.type === 'sent'
            })}
          >
            <p className="mb-0 text-body-tertiary text-opacity-85 fw-semibold">
              {message.time}
            </p>
            {message.readAt && (
              <FontAwesomeIcon icon={faCheckDouble} className="text-success" />
            )}
          </div>
          <Lightbox {...lightboxProps} />
        </div>
      </div>
    </div>
  );
};
export default Message;
