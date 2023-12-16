import Modal from '@/app/components/modals/modal';
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react';
import { User } from '@/typescript/comment';
import { ImageProfile } from '@/app/components/image-profile';
import { rq } from '@/app/libs/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UsersModalProps { 
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

export const UsersModal = ({
  isOpen,
  onClose,
  users,
}: UsersModalProps) => {
  const router = useRouter()

  const setDefaultUser = async (user: User) => {
    try {
      await rq.put('api/users', { user })
      router.refresh()
    } catch (err:any) {
      toast.error(err?.message || 'Something went wrong!')
    } 
  }

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
            SingIn as any of this users
          </Dialog.Title>
          <div className="mt-3">
            {users.map((user) => (
              <div 
                key={user.username} 
                onClick={() => setDefaultUser(user)}
                className="
                  flex items-center 
                  space-x-4 
                  mt-2
                  duration-100
                  hover:bg-neutral-light-gray
                  cursor-pointer"
              >
                <ImageProfile 
                  src={user.image.webp} 
                  alt={user.username} 
                />
                <div className="text-sm text-gray-500">{user.username}</div>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
