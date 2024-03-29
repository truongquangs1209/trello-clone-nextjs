"use client";
import React, { useContext, useState } from "react";
import { Form, Modal, Select, Avatar, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faUser } from "@fortawesome/free-solid-svg-icons";
import { UserListsContext } from "@/context/AppProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";

function InviteMember({ selectedBoard, selectedWorkspace }) {
  const [form] = Form.useForm();
  const [isInviteMemberVisible, setIsInviteMemberVisible] =
    useState<boolean>(false);
  const [value, setValue] = useState([]);
  const { userLists, members, setMembers } = useContext(UserListsContext);
  //  console.log(members)
  const { workspace } = useContext(WorkSpaceContext);

  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };

  const handleOK = () => {
    const memberCollection = collection(db, "member");
    value.forEach(async (valueId) => {
      const selectUser = userLists.find((user) => user.id === valueId);
      if (selectUser) {
        await addDoc(memberCollection, {
          email: selectUser.email,
          photoURL: selectUser.photoURL,
          displayName: selectUser.displayName,
          boardId: selectedBoard?.id,
          workspaceId: selectedWorkspace,
        });
        setMembers([...members, selectUser as any]);
      }
    });
    setValue([]);
    setIsInviteMemberVisible(false);
  };


  const fillWorkspace = workspace?.find(
    (item) => item.id === selectedWorkspace
  );
  const userListNotInMembers = userLists?.filter(user => !members.some(member => member.id === user.id));
  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => setIsInviteMemberVisible(true)}
        className="flex items-center justify-between hover:bg-slate-800 p-3 transition"
      >
        <div className="">
          <FontAwesomeIcon className="w-4 h-4" icon={faUser} />
          <span className="text-sm font-normal p-2">Thành viên</span>
        </div>
        <FontAwesomeIcon className="cursor-pointer" icon={faAdd} />
      </div>

      <Avatar.Group size="small" maxCount={2}>
        {members
          ?.filter((member) => member.workspaceId === selectedWorkspace)
          .map((user) => (
            <Tooltip key={user.email} title={user.email}>
              <Avatar
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://tse4.explicit.bing.net/th?id=OIP.xo-BCC1ZKFpLL65D93eHcgHaGe&pid=Api&P=0&h=180"
                }
              />
            </Tooltip>
          ))}
      </Avatar.Group>
      <div>
        <Modal
          title="Mời thêm thành viên"
          open={isInviteMemberVisible}
          destroyOnClose
          onOk={handleOK}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            {userLists && members ? (
              <Select
                mode="multiple"
                showSearch
                value={value}
                filterOption
                placeholder="Nhập tên thành viên"
                onChange={(newValue) => setValue(newValue)}
                style={{ width: "100%" }}
              >
                {userListNotInMembers
                  ?.filter((item) => item?.id !== fillWorkspace.createBy)
                  .map((user) => (
                    <Select.Option key={user.id} value={user.id}>
                      <Avatar size="small" src={user.photoURL}>
                        {user.photoURL
                          ? ""
                          : user.displayName
                          ? user?.displayName?.charAt(0).toUpperCase()
                          : user?.email?.charAt(0).toUpperCase()}
                      </Avatar>
                      {user.displayName ? user.displayName : user.email}
                    </Select.Option>
                  ))}
              </Select>
            ) : (
              <p>Loading...</p>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default InviteMember;
