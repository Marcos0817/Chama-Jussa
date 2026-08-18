import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import { NotificStyle } from './NotificacaoStyle';
import { Footer } from '../../components/footer/Footer';

export const Notificacao = () => {
    return (
        <View style={NotificStyle.container}>
            
            {/* Título Estático (Fixo no topo) */}
            <Text style={NotificStyle.title}>
                Notificações
            </Text>

            {/* Conteúdo Rolável */}
            <ScrollView
                style={NotificStyle.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={NotificStyle.scrollContent}
            >

                <View style={NotificStyle.notification}>
                    <Text style={NotificStyle.icon}>
                        ◀
                    </Text>

                    <View style={NotificStyle.notificationContent}>
                        <Text style={NotificStyle.notificationTitle}>
                            Ordem de Serviço finalizada
                        </Text>

                        <Text style={NotificStyle.description}>
                            Sua OS foi finalizada, logo ela{'\n'}
                            voltará para sua sala.
                        </Text>

                        <View style={NotificStyle.dateContainer}>
                            <Text style={NotificStyle.date}>
                                22/06/2026
                            </Text>

                            <Text style={NotificStyle.time}>
                                16:03
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        NotificStyle.notification,
                        NotificStyle.notificationSelected,
                    ]}
                >
                    <Text style={NotificStyle.icon}>
                        ◀
                    </Text>

                    <View style={NotificStyle.notificationContent}>
                        <Text style={NotificStyle.notificationTitle}>
                            Ordem de Serviço finalizada
                        </Text>

                        <Text style={NotificStyle.description}>
                            Sua OS foi finalizada, logo ela{'\n'}
                            voltará para sua sala.
                        </Text>

                        <View style={NotificStyle.dateContainer}>
                            <Text style={NotificStyle.date}>
                                22/06/2026
                            </Text>

                            <Text style={NotificStyle.time}>
                                16:03
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={NotificStyle.notification}>
                    <Text style={NotificStyle.icon}>
                        ◀
                    </Text>

                    <View style={NotificStyle.notificationContent}>
                        <Text style={NotificStyle.notificationTitle}>
                            Ordem de Serviço finalizada
                        </Text>

                        <Text style={NotificStyle.description}>
                            Sua OS foi finalizada, logo ela{'\n'}
                            voltará para sua sala.
                        </Text>

                        <View style={NotificStyle.dateContainer}>
                            <Text style={NotificStyle.date}>
                                22/06/2026
                            </Text>

                            <Text style={NotificStyle.time}>
                                16:03
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={NotificStyle.notification}>
                    <Text style={NotificStyle.icon}>
                        ◀
                    </Text>

                    <View style={NotificStyle.notificationContent}>
                        <Text style={NotificStyle.notificationTitle}>
                            Ordem de Serviço finalizada
                        </Text>

                        <Text style={NotificStyle.description}>
                            Sua OS foi finalizada, logo ela{'\n'}
                            voltará para sua sala.
                        </Text>

                        <View style={NotificStyle.dateContainer}>
                            <Text style={NotificStyle.date}>
                                22/06/2026
                            </Text>

                            <Text style={NotificStyle.time}>
                                16:03
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Footer Fixo */}
            <Footer />
        </View>
    );
};