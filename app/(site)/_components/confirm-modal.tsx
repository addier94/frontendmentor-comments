'use client';

import React, { useCallback, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modals/modal';
import Button from '@/app/components/button';
import { toast } from 'react-hot-toast';
import { rq } from '@/app/libs/axios';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  commentId: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose,
  commentId
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const onDelete = useCallback(() => {
    setIsLoading(true);

      rq.delete(`api/comments/${commentId}`)
        .then(() => {
          onClose()
          router.refresh()        
        })
        .catch(err => {
          toast.error(err?.response?.data || 'Something went wrong!')
        })
        .finally(() => setIsLoading(false))

  }, [router, onClose, commentId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div 
          className=""
        >
          <Dialog.Title 
            as="h3" 
            className="text-xl font-semibold text-neutral-dark-blue"
          >
            Delete comment
          </Dialog.Title>
          <div className="mt-3">
            <p className="text-base text-gray-500">
              Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          disabled={isLoading}
          secondary
          onClick={onClose}
        >
          NO, CANCEL
        </Button>
        <Button
          disabled={isLoading}
          danger
          onClick={onDelete}
        >
          YES, DELETE
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal;
