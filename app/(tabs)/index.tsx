import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    StatusBar,
    Button
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from '@/components/ThemedText';


export default function HomeScreen() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [scheduleList, setScheduleList] = useState([]);
    const [mode, setMode] = useState('date');

    const showMode = useCallback((currentMode: React.SetStateAction<string>) => {
        if (Platform.OS === 'android') {
            setShowPicker(true);
        }
        setMode(currentMode);
    }, []);

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onChange = (event, selected) => {
        const currentDate = selected || selectedDate;
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        if (selected) {
            setSelectedDate(currentDate);
            generateSchedule(currentDate);
        }
    };

    const getDayName = (date) => {
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        return days[date.getDay()];
    };

    const generateSchedule = (startDate) => {
        const schedule = [];
        let currentDate = new Date(startDate);

        for (let i = 0; i < 30; i++) {
            const workStart = new Date(currentDate);
            const workEnd = new Date(currentDate.getTime() + (12 * 60 * 60 * 1000));
            const dayName = getDayName(currentDate);

            schedule.push({
                type: 'work',
                start: workStart,
                end: workEnd,
                dayName: dayName
            });

            const restStart = new Date(workEnd);
            const restEnd = new Date(workEnd.getTime() + (24 * 60 * 60 * 1000));

            schedule.push({
                type: 'rest',
                start: restStart,
                end: restEnd,
                dayName: getDayName(restStart)
            });

            currentDate = new Date(restEnd);
        }

        setScheduleList(schedule);
    };

    const formatDate = (date) => {
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <ThemedText style={styles.title}>Çalışma Programı</ThemedText>

                    <View style={styles.datePickerButtons}>
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={showDatepicker}>
                            <ThemedText style={styles.dateButtonText}>Tarih Seç</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.timeButton}
                            onPress={showTimepicker}>
                            <ThemedText style={styles.dateButtonText}>Saat Seç</ThemedText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.selectedDateContainer}>
                        <ThemedText style={styles.selectedDateLabel}>Seçilen Tarih ve Saat:</ThemedText>
                        <ThemedText style={styles.selectedDateText}>{formatDate(selectedDate)}</ThemedText>
                    </View>
                </View>

                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}

                <ScrollView style={styles.scheduleScrollView}>
                    <View style={styles.scheduleContainer}>
                        {scheduleList.map((period, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.periodCard,
                                    period.type === 'work' ? styles.workCard : styles.restCard
                                ]}>
                                <View style={styles.periodHeader}>
                                    <View>
                                        <ThemedText style={styles.periodType}>
                                            {period.type === 'work' ? '👷 Çalışma Periyodu' : '🌟 İzin Periyodu'}
                                        </ThemedText>
                                        <ThemedText style={styles.dayName}>{period.dayName}</ThemedText>
                                    </View>
                                    <View style={[
                                        styles.statusIndicator,
                                        period.type === 'work' ? styles.workIndicator : styles.restIndicator
                                    ]} />
                                </View>
                                <View style={styles.timeInfo}>
                                    <View style={styles.timeBlock}>
                                        <ThemedText style={styles.timeLabel}>Başlangıç</ThemedText>
                                        <ThemedText style={styles.timeText}>{formatDate(period.start)}</ThemedText>
                                    </View>
                                    <View style={styles.timeBlock}>
                                        <ThemedText style={styles.timeLabel}>Bitiş</ThemedText>
                                        <ThemedText style={styles.timeText}>{formatDate(period.end)}</ThemedText>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mainContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
        zIndex: 1,
    },
    scheduleScrollView: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 16,
        zIndex: 9999,

    },
    datePickerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 16,
    },
    dateButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        minWidth: 120,
        alignItems: 'center',
    },
    timeButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        minWidth: 120,
        alignItems: 'center',
    },
    dateButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    selectedDateContainer: {
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 16,
    },
    selectedDateLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    selectedDateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    scheduleContainer: {
        padding: 16,
        gap: 16,
    },
    periodCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    workCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    restCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    periodHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    periodType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    dayName: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    workIndicator: {
        backgroundColor: '#2196F3',
    },
    restIndicator: {
        backgroundColor: '#4CAF50',
    },
    timeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    timeBlock: {
        flex: 1,
    },
    timeLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#1a1a1a',
    }
});