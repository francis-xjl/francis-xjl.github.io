# Docker & Kubernetes 安装(CentOS 7.6)

## 安装docker
```bash
# 移除旧版本docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 更新yum源
sudo yum update

# 配置docker-ce源
yum-config-manager \
    --add-repo \
    https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo

# 安装docker
sudo yum install docker-ce docker-ce-cli containerd.io

# 配置加速地址
sudo tee /etc/docker/daemon.json <<-'EOF'
{
   "registry-mirrors": ["https://registry.docker-cn.com"]
}
EOF

# 重启服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 开启docker服务
systemctl enable docker.service
```

## 安装Kubernetes
```bash
# 配置k8s阿里源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 安装基本工具
yum install -y kubelet kubeadm kubectl

# 关闭swap
sudo swapoff -a
# 同时永久禁掉swap分区，打开如下文件注释掉swap那一行
sudo vi /etc/fstab


# 重启服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 国内环境安装(国外环境直接：kubeadm config images pull)
kubeadm config images list --kubernetes-version v1.20.1
# 上面命令在本机得到如下结果:
# k8s.gcr.io/kube-apiserver:v1.20.1
# k8s.gcr.io/kube-controller-manager:v1.20.1
# k8s.gcr.io/kube-scheduler:v1.20.1
# k8s.gcr.io/kube-proxy:v1.20.1
# k8s.gcr.io/pause:3.2
# k8s.gcr.io/etcd:3.4.13-0
# k8s.gcr.io/coredns:1.7.0

# 获取所有相关的镜像(非官方镜像，是网友复制过来的，所以pull之后我们要调整tag)
docker pull imdingtalk/kube-apiserver:v1.20.1
docker pull imdingtalk/kube-controller-manager:v1.20.1
docker pull imdingtalk/kube-scheduler:v1.20.1
docker pull imdingtalk/kube-proxy:v1.20.1
docker pull imdingtalk/pause:3.2
docker pull imdingtalk/etcd:3.4.13-0
docker pull imdingtalk/coredns:1.7.0

# 修改docker的tag
docker tag imdingtalk/kube-apiserver:v1.20.1 k8s.gcr.io/kube-apiserver:v1.20.1
docker tag imdingtalk/kube-controller-manager:v1.20.1 k8s.gcr.io/kube-controller-manager:v1.20.1
docker tag imdingtalk/kube-scheduler:v1.20.1 k8s.gcr.io/kube-scheduler:v1.20.1
docker tag imdingtalk/kube-proxy:v1.20.1 k8s.gcr.io/kube-proxy:v1.20.1
docker tag imdingtalk/pause:3.2 k8s.gcr.io/pause:3.2
docker tag imdingtalk/etcd:3.4.13-0 k8s.gcr.io/etcd:3.4.13-0
docker tag imdingtalk/coredns:1.7.0 k8s.gcr.io/coredns:1.7.0

# 移除网友复制的docker
docker rmi imdingtalk/kube-apiserver:v1.20.1
docker rmi imdingtalk/kube-controller-manager:v1.20.1
docker rmi imdingtalk/kube-scheduler:v1.20.1
docker rmi imdingtalk/kube-proxy:v1.20.1
docker rmi imdingtalk/pause:3.2
docker rmi imdingtalk/etcd:3.4.13-0
docker rmi imdingtalk/coredns:1.7.0

# 初始化集群控制平面（注意版本要与上面的镜像一致）
echo 1 > /proc/sys/net/bridge/bridge-nf-call-iptables
echo 1 > /proc/sys/net/bridge/bridge-nf-call-ip6tables

systemctl start kubelet
systemctl enable kubelet
kubeadm init --kubernetes-version v1.20.1 --pod-network-cidr=10.244.0.0/16

# 成功后，输出如下
# -------------------------------
# Your Kubernetes control-plane has initialized successfully!

# To start using your cluster, you need to run the following as a regular user:

#   mkdir -p $HOME/.kube
#   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
#   sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Alternatively, if you are the root user, you can run:

#   export KUBECONFIG=/etc/kubernetes/admin.conf

# You should now deploy a pod network to the cluster.
# Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
#   https://kubernetes.io/docs/concepts/cluster-administration/addons/

# Then you can join any number of worker nodes by running the following on each as root:

# kubeadm join 10.10.11.151:6443 --token 10vmvn.44wewitk773o6qb9 \
#     --discovery-token-ca-cert-hash sha256:201917665b8b42e56a575e0940bdce4039b0cb0fbbc014a1753e6e35508acb12
# -------------------------------

# 根据提示，切换到正常用户下，执行以下命令:
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
